import React from 'react';
import styles from '../Treemap/Treemap.module.scss';
import * as d3 from 'd3';
import { range } from 'd3';

export interface WaffleChartData {
    id: string;
    value: number;
    strength: number; // [0, 1]
    color: string;
}

export interface WaffleChartProps {
    width: number;
    height: number;
    data: WaffleChartData[];
    minSize: number;
    onHover: (id: string | null) => void;
}

const WaffleChart = ({ width, height, data, minSize, onHover }: WaffleChartProps) => {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const effectiveWidth = width - margin.right - margin.left;
    const xCount = Math.floor(effectiveWidth / minSize);
    const size = effectiveWidth / xCount;

    const effectiveHeight = height - margin.bottom - margin.top;
    const yCount = Math.floor(effectiveHeight / size);

    const yRemainder = effectiveHeight % size;

    const xRange = range(xCount).map((n) => '' + n);
    const xScale = d3
        .scaleBand()
        .domain(xRange)
        .range([margin.left, width - margin.right])
        .round(false);

    const yRange = range(yCount).map((n) => '' + n);
    const yScale = d3
        .scaleBand()
        .domain(yRange)
        .range([margin.top + yRemainder, height - margin.bottom])
        .round(false);

    const totalWaffles = xCount * yCount;
    const totalValue = data.reduce((acc, d) => acc + d.value, 0);

    let nextOffset = 0;
    const waffleData = data.map((d, i, all) => {
        const offset = nextOffset;
        const fraction = d.value / totalValue;
        let count = Math.round(totalWaffles * fraction);

        if (i === all.length - 1) {
            // Todo: Rounding errors can lead to over or undershooting the totalWaffles count. This is a very dirty fix :]
            count = totalWaffles - offset;
        }

        nextOffset += count;

        return {
            count,
            data: d,
            offset,
        };
    });

    return (
        <svg width={width} height={height} className={styles.svg}>
            {waffleData.map(({ count, offset, data }) => {
                return (
                    <g key={data.id} onPointerEnter={() => onHover?.(data.id)} onPointerLeave={() => onHover?.(null)}>
                        {d3.range(count).map((index) => {
                            const linearIndex = index + offset;
                            const xIndex = linearIndex % xCount;
                            const yIndex = Math.floor(linearIndex / xCount);

                            const posX = xScale('' + xIndex)!;
                            const posY = yScale('' + yIndex)!;

                            return (
                                <Waffle
                                    key={index + offset}
                                    x={posX}
                                    y={posY}
                                    xSize={xScale.bandwidth()}
                                    ySize={yScale.bandwidth()}
                                    strength={data.strength}
                                    bg={data.color}
                                >
                                    <title>
                                        index: {index + offset}
                                        xIndex: {xIndex}; yIndex: {yIndex}
                                    </title>
                                </Waffle>
                            );
                        })}
                    </g>
                );
            })}
        </svg>
    );
};

export default WaffleChart;

export interface WaffleProps {
    x: number;
    y: number;
    xSize: number;
    ySize: number;
    strength: number;
    bg: string;
    children: React.ReactNode;
}

const Waffle = ({ x, y, xSize, ySize, strength, bg, children }: WaffleProps) => {
    const getRect = (x: number, y: number, xRectSize: number, yRectSize: number) => {
        return {
            x: x + (xSize - xRectSize) / 2,
            y: y + (xSize - xRectSize) / 2,
            width: xRectSize,
            height: yRectSize,
        };
    };

    return (
        <g>
            {strength !== 1 && <rect {...getRect(x, y, xSize, ySize)} fill={bg} shapeRendering={'crispEdges'} />}
            {strength !== 0 && (
                <rect
                    {...getRect(x, y, xSize * strength, ySize * strength)}
                    fill={'var(--black)'}
                    shapeRendering={'crispEdges'}
                />
            )}
            {children}
        </g>
    );
};
