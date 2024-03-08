import React from 'react';
import AxisLinear from '../ScatterPlot/Axis';
import * as d3 from 'd3';
import AxisLabel from '../ScatterPlot/AxisLabel';
import AxisOrdinal from './AxisOrdinal';
import { notNullish } from '../../../tools/notNullish';
import { groupAdjacent } from '../../../tools/array';
import { clamp } from '../../../tools/math';

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
        .domain(xAxis.keys)
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

    const mapDataPoints = (datum: T) => {
        return xAxis.keys.map((key) => {
            const yValue = yAxis.getValue(datum, key);
            const xPos = x(key) ?? null;
            const yPos = yValue != null ? y(yValue) ?? null : null;
            if (xPos == null || yPos == null) return null;
            return { x: xPos, y: yPos };
        });
    };

    return (
        <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}>
            {yAxis.label && (
                <AxisLabel yAxis axisScale={{ x, y }} inlineMargin={16} blockMargin={8}>
                    {yAxis.label}
                </AxisLabel>
            )}
            {xAxis.label && (
                <AxisLabel xAxis axisScale={{ x, y }}>
                    {xAxis.label}
                </AxisLabel>
            )}

            {data.map((datum, index) => {
                const segments = groupAdjacent(mapDataPoints(datum), (p) => p == null)
                    .map((segment, index, all) => {
                        if (segment.some((p) => p == null)) {
                            const prevSegment = all[index - 1];
                            const nextSegment = all[index + 1];
                            const start = prevSegment?.at(-1);
                            const end = nextSegment?.at(0);
                            if (!start || !end) return null;
                            return { strokeDasharray: '6px 12px', points: [start, end] };
                        } else {
                            return { points: segment.filter(notNullish) };
                        }
                    })
                    .filter(notNullish);

                const color = index === 0 ? 'var(--font-color)' : 'var(--accent-color)';

                return segments.map(({ points, ...styles }, i) => {
                    if (points.length === 1) {
                        const point = points[0];
                        return (
                            <line
                                key={`datum:${index}.single${i}`}
                                x1={clamp(point.x - 8, x.range()[0], x.range()[1])}
                                x2={clamp(point.x + 8, x.range()[0], x.range()[1])}
                                y1={point.y}
                                y2={point.y}
                                stroke={color}
                                strokeWidth={3}
                            />
                        );
                    }

                    const d = line(points);
                    if (!d) return null;

                    return (
                        <g key={`datum:${index}.seg:${i}`}>
                            {!styles.strokeDasharray && (
                                <path
                                    fill={'none'}
                                    stroke={'var(--background)'}
                                    strokeWidth={6}
                                    d={d}
                                    strokeLinecap={'round'}
                                />
                            )}
                            <path
                                fill={'none'}
                                stroke={color}
                                strokeWidth={3}
                                {...styles}
                                strokeDasharray={styles.strokeDasharray}
                                d={d}
                            />
                        </g>
                    );
                });
            })}

            <AxisOrdinal axisScale={x} y={y(0)} />
            <AxisLinear axisScale={y} x={x.range()[0]} ticks={ticksY} />
        </svg>
    );
};

export default LineChart;
