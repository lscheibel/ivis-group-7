import React from 'react';
import styles from '../Treemap/Treemap.module.scss';
import * as d3 from 'd3';
import { range } from 'd3';
import { call } from '../../../tools/call';

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
    highlight?: string | null;
}

const WaffleChart = ({ width, height, data, minSize, onHover, highlight }: WaffleChartProps) => {
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
        .paddingInner(0)
        .domain(xRange)
        .range([margin.left, width - margin.right])
        .round(false);

    const yRange = range(yCount).map((n) => '' + n);
    const yScale = d3
        .scaleBand()
        .paddingInner(0)
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

    const highlightedDataGroup = waffleData.find((d) => d.data.id === highlight);

    const linearToXY = (linearIndex: number) => {
        const x = linearIndex % xCount;
        const y = Math.floor(linearIndex / xCount);
        return { x, y };
    };

    type DataGroup = (typeof waffleData)[number];
    const toWafflePositions = (dataGroup: DataGroup) => {
        return d3.range(dataGroup.count).map((index) => {
            const { x, y } = linearToXY(index + dataGroup.offset);
            return {
                x: xScale('' + x)!,
                y: yScale('' + y)!,
                index: index + dataGroup.offset,
            };
        });
    };

    const renderWaffleGroup = (group: DataGroup) => {
        return toWafflePositions(group).map(({ x, y, index }) => {
            return (
                <React.Fragment key={`waffle:${index}`}>
                    {group.data.strength !== 1 && (
                        <Waffle
                            key={`bg:${index}`}
                            x={x}
                            y={y}
                            xSize={xScale.bandwidth()}
                            ySize={yScale.bandwidth()}
                            bg={group.data.color}
                        />
                    )}
                    {group.data.strength !== 0 &&
                        call(() => {
                            const xSize = xScale.bandwidth() * group.data.strength;
                            const ySize = yScale.bandwidth() * group.data.strength;
                            return (
                                <Waffle
                                    key={`dot:${index}`}
                                    x={x}
                                    y={y}
                                    xSize={xSize}
                                    ySize={ySize}
                                    offset={(xScale.bandwidth() - xSize) / 2}
                                    bg={'var(--font-color)'}
                                />
                            );
                        })}
                </React.Fragment>
            );
        });
    };

    return (
        <svg width={width} height={height} className={styles.svg}>
            {waffleData.map((dataGroup) => {
                return (
                    <g
                        key={dataGroup.data.id}
                        onPointerEnter={() => onHover?.(dataGroup.data.id)}
                        onPointerLeave={() => onHover?.(null)}
                    >
                        {renderWaffleGroup(dataGroup)}
                    </g>
                );
            })}

            {highlightedDataGroup && (
                <g style={{ pointerEvents: 'none' }}>
                    {toWafflePositions(highlightedDataGroup).map(({ x, y, index }) => {
                        const borderWidth = 4;
                        return (
                            <Waffle
                                key={index}
                                x={x}
                                y={y}
                                xSize={xScale.bandwidth()}
                                ySize={yScale.bandwidth()}
                                bg={'var(--background)'}
                                padding={borderWidth}
                            />
                        );
                    })}
                    {renderWaffleGroup(highlightedDataGroup)}
                </g>
            )}
        </svg>
    );
};

export default WaffleChart;

export interface WaffleProps {
    x: number;
    y: number;
    xSize: number;
    ySize: number;
    bg: string;
    padding?: number;
    offset?: number; // Can be used to effectively center the inner element. Bit hacky :]
}

const Waffle = ({ x, y, xSize, ySize, bg, offset = 0, padding = 0 }: WaffleProps) => {
    const xPos = x - padding + offset;
    const yPos = y - padding + offset;
    const width = xSize + padding * 2;
    const height = ySize + padding * 2;

    return <rect x={xPos} y={yPos} width={width} height={height} fill={bg} shapeRendering={'crispEdges'} />;
};
