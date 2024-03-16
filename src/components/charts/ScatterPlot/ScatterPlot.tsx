import React, { useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CountryDatum } from '../../../data/data';
import {
    getHoveredCountry,
    setHoveredCountry,
    setSelectedCountry,
    useHoveredCountry,
    useSelectedCountry,
} from '../../../state/selectedCountry';
import { approxEq } from '../../../tools/math';
import Axis, { TickDefinition } from './Axis';
import AxisLabel from './AxisLabel';
import GuideLine from './GuideLine';
import { notNullish } from '../../../tools/notNullish';
import InteractiveScatterPoints, { ScatterPlotAttributes } from './InteractiveScatterPoints';
import { call } from '../../../tools/call';
import AxisLabelSelect from '../AxisLabelSelect/AxisLabelSelect';

export interface AxisDefinition {
    getValue: (country: CountryDatum) => number | Nullish;
    from: number;
    to: number;
    label: React.ReactNode;
    formatter?: (tick: TickDefinition) => React.ReactNode;
}

export interface ScatterPlotProps {
    width: number;
    height: number;
    data: CountryDatum[];
    xAxis: AxisDefinition | AxisDefinition[];
    yAxis: AxisDefinition | AxisDefinition[];
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

const ScatterPlot = ({
    width,
    height,
    data,
    xAxis: xAxes,
    yAxis: yAxes,
    margin: maybeMargin = {},
}: ScatterPlotProps) => {
    const [selectedAxis, setSelectedAxis] = useState({ x: 0, y: 0 });
    const xAxis = (Array.isArray(xAxes) ? xAxes : [xAxes])[selectedAxis.x];
    const yAxis = (Array.isArray(yAxes) ? yAxes : [yAxes])[selectedAxis.y];

    const multipleXAxes = Array.isArray(xAxes) && xAxes.length > 1;
    const multipleYAxes = Array.isArray(yAxes) && yAxes.length > 1;

    const selectedCountry = useSelectedCountry();
    const hoveredCountry = useHoveredCountry();
    const svgRef = useRef<SVGSVGElement | null>(null);

    const [pointerValue, setPointerValue] = useState<{ x: number; y: number } | null>(null);

    const margin = { top: 40, right: 40, bottom: 40, left: 40, ...maybeMargin };

    const getX = xAxis.getValue;
    const getY = yAxis.getValue;

    const dataMinX = Math.min(...data.map((c) => getX(c) || Infinity));
    const dataMaxX = Math.max(...data.map((c) => getX(c) || -Infinity));

    const dataMinY = Math.min(...data.map((c) => getY(c) || Infinity));
    const dataMaxY = Math.max(...data.map((c) => getY(c) || -Infinity));

    const x = useMemo(
        () =>
            d3
                .scaleLinear()
                .domain([xAxis.from, xAxis.to])
                .range([margin.left, width - margin.right])
                .clamp(true),
        [xAxis.from, xAxis.to, margin.left, margin.right, width]
    );
    const y = useMemo(
        () =>
            d3
                .scaleLinear()
                .domain([yAxis.from, yAxis.to])
                .range([height - margin.bottom, margin.top])
                .clamp(true),
        [yAxis.from, yAxis.to, margin.bottom, margin.top, height]
    );

    let ticksX = [dataMinX, dataMaxX, xAxis.to];
    let ticksY = [dataMinY, dataMaxY];

    let snappedPointerValue = pointerValue;
    if (hoveredCountry) {
        const xValueHovered = getX(hoveredCountry);
        const yValueHovered = getY(hoveredCountry);
        if (xValueHovered != null && yValueHovered != null) {
            snappedPointerValue = { x: xValueHovered, y: yValueHovered };
        }
    }

    if (snappedPointerValue) {
        ticksX = [
            ...ticksX.filter((value) => !approxEq(x(value), x(snappedPointerValue!.x), 20)),
            snappedPointerValue.x,
        ];
        ticksY = [
            ...ticksY.filter((value) => !approxEq(y(value), y(snappedPointerValue!.y), 20)),
            snappedPointerValue.y,
        ];
    }

    const plotData = useMemo(() => {
        return data
            .map((country) => {
                const valueX = getX(country);
                const valueY = getY(country);
                if (valueX == null || valueY == null) return null;
                return { x: x(valueX), y: y(valueY), id: country.id, title: country.countryName, country };
            })
            .filter(notNullish) satisfies ScatterPlotAttributes[];
    }, [data, getX, getY, x, y]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            viewBox={`0, 0, ${width}, ${height}`}
            onPointerMove={(e) => {
                const clientRect = e.currentTarget.getBoundingClientRect();

                const offsetX = e.clientX - clientRect.left;
                const offsetY = e.clientY - clientRect.top;

                const worldSpaceX = x.invert(offsetX);
                const worldSpaceY = y.invert(offsetY);

                setPointerValue({ x: worldSpaceX, y: worldSpaceY });
            }}
            onPointerLeave={() => setPointerValue(null)}
        >
            <Axis
                axisScale={x}
                y={y.range()[0]}
                ticks={ticksX.map((t) => ({ value: t }))}
                formatter={xAxis.formatter}
            />
            <Axis
                axisScale={y}
                x={x.range()[0]}
                ticks={ticksY.map((t) => ({ value: t }))}
                formatter={yAxis.formatter}
            />

            <AxisLabel yAxis axisScale={{ x, y }}>
                {yAxis.label}
            </AxisLabel>
            {multipleXAxes ? (
                <AxisLabelSelect
                    x={x.range()[0] + 32}
                    y={y.range()[0] - 2}
                    value={'' + selectedAxis.x}
                    onChange={(v) => setSelectedAxis((s) => ({ ...s, x: +v }))}
                    options={xAxes.map((axis, i) => ({ value: '' + i, label: axis.label }))}
                />
            ) : (
                <AxisLabel xAxis axisScale={{ x, y }}>
                    {xAxis.label}
                </AxisLabel>
            )}

            <g style={{ pointerEvents: 'none' }}>
                {snappedPointerValue && (
                    <GuideLine
                        x1={x(snappedPointerValue.x)}
                        y1={y.range()[0]}
                        x2={x(snappedPointerValue.x)}
                        y2={y(snappedPointerValue.y)}
                    />
                )}
                {snappedPointerValue && (
                    <GuideLine
                        x1={x.range()[0]}
                        y1={y(snappedPointerValue.y)}
                        x2={x(snappedPointerValue.x)}
                        y2={y(snappedPointerValue.y)}
                    />
                )}
            </g>

            <InteractiveScatterPoints
                data={plotData}
                onDatumPointerLeave={() => {
                    setHoveredCountry(null);
                    svgRef.current!.style.cursor = '';
                }}
                onDatumPointerOver={(datum) => {
                    setHoveredCountry(datum.id);
                    svgRef.current!.style.cursor = 'pointer';
                }}
                onDatumClick={() => {
                    setSelectedCountry(getHoveredCountry());
                }}
                onDatumClickMiss={() => {
                    setSelectedCountry(null);
                }}
                renderDatum={({ x, y, id, title }) => {
                    if (selectedCountry?.id === id || hoveredCountry?.id === id) return null; // Skip render here and instead render them on top.
                    return <DatumCircle key={id} x={x} y={y} title={title} />;
                }}
            />
            {call(() => {
                if (selectedCountry?.id == null) return null;
                const pos = { x: getX(selectedCountry), y: getY(selectedCountry) };
                if (pos.x == null || pos.y == null) return null;
                return <DatumCircle x={x(pos.x)} y={y(pos.y)} selected title={selectedCountry.countryName} />;
            })}
            {call(() => {
                if (hoveredCountry?.id == null) return null;
                if (hoveredCountry.id === selectedCountry?.id) return null; // We're already displaying this data point above.;
                const pos = { x: getX(hoveredCountry), y: getY(hoveredCountry) };
                if (pos.x == null || pos.y == null) return null;
                return <DatumCircle x={x(pos.x)} y={y(pos.y)} highlight title={hoveredCountry.countryName} />;
            })}
        </svg>
    );
};

export default ScatterPlot;

export interface DatumCircleProps {
    x: number;
    y: number;
    highlight?: boolean;
    selected?: boolean;
    title?: React.ReactNode;
}

const DatumCircle = ({ x, y, title, highlight, selected }: DatumCircleProps) => {
    const size = selected ? 6 : 3;

    return (
        <>
            {(highlight || selected) && (
                <circle cx={x} cy={y} r={size + 2} fill={'var(--background)'}>
                    {title && <title>{title}</title>}
                </circle>
            )}
            <circle cx={x} cy={y} r={size} fill={highlight || selected ? 'var(--accent-color)' : 'var(--font-color)'}>
                {title && <title>{title}</title>}
            </circle>
        </>
    );
};
