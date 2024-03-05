import React from 'react';
import AxisLinear from '../ScatterPlot/Axis';
import * as d3 from 'd3';
import AxisLabel from '../ScatterPlot/AxisLabel';
import AxisOrdinal from './AxisOrdinal';

export interface XAxisDefinition {
    keys: Array<string>; // Discrete (categorical) values
    label: React.ReactNode;
}

export interface YAxisDefinition<T> {
    getValue: (country: T, key: string) => number | Nullish;
    from: number;
    to: number;
    label: React.ReactNode;
}

export interface LineChartProps<T> {
    width: number;
    height: number;
    data: T[];
    xAxis: XAxisDefinition;
    yAxis: YAxisDefinition<T>;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

const LineChart = <T,>({ width, height, data, yAxis, xAxis, margin: maybeMargin = {} }: LineChartProps<T>) => {
    const margin = { top: 16, right: 40, bottom: 40, left: 40, ...maybeMargin };

    const x = d3
        .scalePoint()
        .domain(['', ...xAxis.keys])
        .range([margin.left, width - margin.right]);

    const y = d3
        .scaleLinear()
        .domain([yAxis.from, yAxis.to])
        .range([height - margin.bottom, margin.top])
        .clamp(true);

    const ticksY = [yAxis.from, yAxis.to];

    const line = d3
        .line<{ x: number; y: number }>()
        .x((d) => d.x)
        .y((d) => d.y);

    const getDataPoints = (datum: T) => {
        return xAxis.keys.map((key) => ({
            x: x(key) || 0, //TODO Fix this!
            y: y(yAxis.getValue(datum, key) || 0), //TODO Fix this!
        }));
    };

    return (
        <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}>
            <AxisOrdinal axisScale={x} y={y(0)} />
            <AxisLinear axisScale={y} x={x.range()[0]} ticks={ticksY} />

            {yAxis.label && (
                <AxisLabel yAxis axisScale={{ x, y }}>
                    {yAxis.label}
                </AxisLabel>
            )}
            {xAxis.label && (
                <AxisLabel xAxis axisScale={{ x, y }}>
                    {xAxis.label}
                </AxisLabel>
            )}

            {data.map((datum, index) => {
                const points = getDataPoints(datum);
                return (
                    <path
                        key={index}
                        fill={'none'}
                        stroke={index === 0 ? '#F22F29' : '#FFCB00'}
                        strokeWidth={'2px'}
                        d={line(points) || ''}
                    />
                );
            })}
            {data.map((datum, datumIndex) => {
                const points = getDataPoints(datum);
                return points.map((circle, index) => (
                    <circle
                        key={`points:${index}`}
                        r={4}
                        fill={datumIndex === 0 ? '#F22F29' : '#FFCB00'}
                        cx={circle.x}
                        cy={circle.y}
                    />
                ));
            })}
        </svg>
    );
};

export default LineChart;
