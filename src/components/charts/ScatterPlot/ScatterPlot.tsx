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
import Axis from './Axis';
import AxisLabel from './AxisLabel';
import GuideLine from './GuideLine';
import { notNullish } from '../../../tools/notNullish';
import InteractiveScatterPoints, { ScatterPlotAttributes } from './InteractiveScatterPoints';
import { call } from '../../../tools/call';

export interface AxisDefinition {
    getValue: (country: CountryDatum) => number | Nullish;
    from: number;
    to: number;
    label: React.ReactNode;
}

export interface ScatterPlotProps {
    width: number;
    height: number;
    data: CountryDatum[];
    xAxis: AxisDefinition;
    yAxis: AxisDefinition;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

const ScatterPlot = ({ width, height, data, xAxis, yAxis, margin: maybeMargin = {} }: ScatterPlotProps) => {
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

    let ticksX = [Math.round(dataMinX), Math.round(dataMaxX), xAxis.to];
    let ticksY = [Math.round(dataMinY), Math.round(dataMaxY), yAxis.to];

    if (pointerValue) {
        ticksX = [...ticksX.filter((value) => !approxEq(x(value), x(pointerValue.x), 20)), pointerValue.x];
        ticksY = [...ticksY.filter((value) => !approxEq(y(value), y(pointerValue.y), 20)), pointerValue.y];
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
            <Axis axisScale={x} y={y(0)} ticks={ticksX} formatter={(v) => `${Math.round(v)}%`} />
            <Axis axisScale={y} x={x(0)} ticks={ticksY} formatter={(v) => Math.round(v)} />

            <AxisLabel yAxis axisScale={{ x, y }}>
                {yAxis.label}
            </AxisLabel>
            <AxisLabel xAxis axisScale={{ x, y }}>
                {xAxis.label}
            </AxisLabel>

            <g style={{ pointerEvents: 'none' }}>
                {pointerValue && (
                    <GuideLine x1={x(pointerValue.x)} y1={y(0)} x2={x(pointerValue.x)} y2={y(pointerValue.y)} />
                )}
                {pointerValue && (
                    <GuideLine x1={x(0)} y1={y(pointerValue.y)} x2={x(pointerValue.x)} y2={y(pointerValue.y)} />
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
                return <DatumCircle x={x(getX(selectedCountry)!)} y={y(getY(selectedCountry)!)} selected />;
            })}
            {call(() => {
                if (hoveredCountry?.id == null) return null;
                if (hoveredCountry.id === selectedCountry?.id) return null; // We're already displaying this data point above.
                return <DatumCircle x={x(getX(hoveredCountry)!)} y={y(getY(hoveredCountry)!)} selected />;
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
    return (
        <>
            {selected && (
                <circle cx={x} cy={y} r={5} fill={'var(--background)'}>
                    {title && <title>{title}</title>}
                </circle>
            )}
            <circle cx={x} cy={y} r={3} fill={highlight || selected ? 'var(--accent-color)' : 'var(--font-color)'}>
                {title && <title>{title}</title>}
            </circle>
        </>
    );
};
