import React, { useEffect, useRef, useState } from 'react';
import AxisLinear from '../ScatterPlot/Axis';
import * as d3 from 'd3';
import AxisLabel from '../ScatterPlot/AxisLabel';
import AxisOrdinal from './AxisOrdinal';
import { notNullish } from '../../../tools/notNullish';
import { groupAdjacent } from '../../../tools/array';
import { clamp } from '../../../tools/math';
import Tick from '../ScatterPlot/Tick';
import { useStableCallback } from '../../../tools/useStableCallback';

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
    // Todo: Clean up.
    const svgRef = useRef<SVGSVGElement | null>(null);
    const margin = { top: 16, right: 40, bottom: 40, left: 40, ...maybeMargin };
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);

    const x = d3
        .scalePoint()
        .domain(xAxis.keys)
        .range([margin.left, width - margin.right]);

    const y = d3
        .scaleLinear()
        .domain([yAxis.from, yAxis.to])
        .range([height - margin.bottom, margin.top])
        .clamp(true);

    const handlePointerMove = useStableCallback((e: PointerEvent) => {
        const svg = e.currentTarget as SVGSVGElement;
        const clientRect = svg.getBoundingClientRect();
        const offsetX = e.clientX - clientRect.left;
        const [start] = x.range();
        const step = x.step();
        const domain = x.domain();
        const domainIndex = Math.round(clamp(Math.round(offsetX - start) / step, 0, domain.length - 1));
        const key = xAxis.keys[domainIndex];
        if (key) {
            setHoveredKey(key);
        }
    });
    const handlePointerLeave = useStableCallback(() => {
        setHoveredKey(null);
    });

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        svg.addEventListener('pointermove', handlePointerMove);
        svg.addEventListener('pointerleave', handlePointerLeave);
        return () => {
            svg.removeEventListener('pointermove', handlePointerMove);
            svg.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, [handlePointerLeave, handlePointerMove]);

    const getValuesForKey = (key: string) =>
        data.map((d) => {
            const yVal = yAxis.getValue(d, key);
            if (!yVal) return null;
            return { x: key, y: yVal };
        });

    const hoveredValues = hoveredKey ? getValuesForKey(hoveredKey).filter(notNullish) : [];
    const ticksY = [
        { value: yAxis.from },
        { value: yAxis.to },
        ...hoveredValues.map(({ y }, i) => ({
            value: y,
            color: i === 0 ? 'var(--font-color)' : 'var(--accent-color)',
        })),
    ];

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
        <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`} ref={svgRef}>
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
                const dataPoints = mapDataPoints(datum);

                const segments = groupAdjacent(dataPoints, (p) => p == null)
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

                const segmentLines = segments.map(({ points, ...styles }, i) => {
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

                const lastPoint = dataPoints.at(-1);

                return (
                    <g key={index} style={{ '--stroke-width': 0 }}>
                        {segmentLines}
                        {lastPoint && (
                            <Tick
                                right
                                x={lastPoint.x}
                                y={lastPoint.y}
                                text={y.invert(lastPoint.y).toFixed()}
                                textMargin={2}
                                color={color}
                            />
                        )}
                    </g>
                );
            })}

            <AxisOrdinal axisScale={x} y={y(0)} />
            <AxisLinear axisScale={y} x={margin.left} ticks={ticksY} formatter={(t) => t.value.toFixed()} />

            <g>
                {hoveredValues.map((value, index) => {
                    const pos = { x: x(value.x), y: y(value.y) };
                    if (pos.x == null || pos.y == null) return null;
                    const color = index === 0 ? 'var(--font-color)' : 'var(--accent-color)';

                    return (
                        <React.Fragment key={index}>
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={4}
                                fill={color}
                                stroke={'var(--background)'}
                                strokeWidth={2.5}
                            />
                        </React.Fragment>
                    );
                })}
            </g>
        </svg>
    );
};

export default LineChart;
