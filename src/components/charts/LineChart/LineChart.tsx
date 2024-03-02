import React from 'react';
import { CountryDatum } from '../../../data/data';
import AxisLinear from '../ScatterPlot/Axis';
import { useSelectedCountry } from '../../../state/selectedCountry';
import { useState, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import Tick from '../ScatterPlot/Tick';
import AxisLabel from '../ScatterPlot/AxisLabel';

export interface XAxisDefinition {
    //Discrete (categorical) values
    keys: Array<string>;
    label: React.ReactNode;
}

export interface YAxisDefinition {
    //
    getValue: (country: CountryDatum, key: string) => number | Nullish;
    from: number;
    to: number;
    label: React.ReactNode;
}

export interface LineChartProps {
    width: number;
    height: number;
    data: CountryDatum[];
    xAxis: XAxisDefinition;
    yAxis: YAxisDefinition;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

const LineChart = ({ width, height, data, yAxis, xAxis, margin: maybeMargin = {} }: LineChartProps) => {
    const selectedCountry = useSelectedCountry();
    const [pointerValue, setPointerValue] = useState<{ x: number; y: number } | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const margin = { top: 40, right: 40, bottom: 40, left: 40, ...maybeMargin };

    const getY = yAxis.getValue;
    //const values = xAxis.keys.map( key => { key. });
    //const dataMinY = Math.min(...xAxis.keys.map((c) => getY(c) || Infinity));
    //const dataMaxY = Math.max(...data.map((c) => getY(c) || -Infinity));

    const x = d3
        .scalePoint()
        .domain(xAxis.keys)
        .range([margin.left, width - margin.right]);

    const y = d3
        .scaleLinear()
        .domain([yAxis.from, yAxis.to])
        .range([height - margin.bottom, margin.top])
        .clamp(true);

    //let ticksX = [Math.round(dataMinX), Math.round(dataMaxX), xAxis.to];
    let ticksY = [yAxis.from, yAxis.to];
    //[Math.round(dataMinY), Math.round(dataMaxY), yAxis.to];
    // if (data[0] == null) return null;
    // let lineData = xAxis.keys.map((key) => ({
    //     x: x(key) || 0, //TODO Fix this!
    //     y: y(yAxis.getValue(data[0], key) || 0), //TODO Fix this!
    // }));

    let line = d3
        .line<{ x: number; y: number }>()
        .x((d) => d.x)
        .y((d) => d.y);

    return (
        <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}>
            <AxisOrdinal axisScale={x} y={y(0)}></AxisOrdinal>
            <AxisLinear axisScale={y} x={x.range()[0]} ticks={ticksY} />

            <AxisLabel yAxis axisScale={{ x, y }}>
                {yAxis.label}
            </AxisLabel>
            <AxisLabel xAxis axisScale={{ x, y }}>
                {xAxis.label}
            </AxisLabel>
            {data.map((datum) => {
                let lineData = xAxis.keys.map((key) => ({
                    x: x(key) || 0, //TODO Fix this!
                    y: y(yAxis.getValue(datum, key) || 0), //TODO Fix this!
                }));
                return <path fill={'none'} stroke={'var(--font-color)'} d={line(lineData) || ''} />;
            })}
        </svg>
    );
};

export interface AxisProps {
    x?: number;
    y?: number;
    axisScale: d3.ScalePoint<string>;
}

const AxisOrdinal = ({ x, y, axisScale }: AxisProps) => {
    const ticks = axisScale.domain();
    const [rangeStart, rangeEnd] = axisScale.range();

    const x1 = x != null ? x : rangeStart;
    const x2 = x != null ? x : rangeEnd;
    const y1 = y != null ? y : rangeStart;
    const y2 = y != null ? y : rangeEnd;

    const tickDirection = x != null ? { left: true } : { down: true };

    return (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'var(--font-color)'} strokeWidth={2} />
            {ticks.map((tick, index) => {
                const posX = x != null ? x : axisScale(tick);
                const posY = y != null ? y : axisScale(tick);

                if (posX == null || posY == null) return null;

                return <Tick key={index} x={posX} y={posY} {...tickDirection} text={tick} textMargin={4} />;
            })}
        </g>
    );
};

export default LineChart;
