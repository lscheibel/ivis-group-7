import React, { useMemo } from 'react';
import * as d3 from 'd3';
import styles from './Treemap.module.scss';
import { Aabb } from '../../../tools/Aabb';

export type TreemapData = {
    id: string;
    label: string;
    valueFormatter: (v: number) => string;
    title?: string;
    value?: number;
    children?: TreemapData[];
};

export interface TreemapProps {
    width: number;
    height: number;
    data: TreemapData;
}

const Treemap = ({ width, height, data }: TreemapProps) => {
    // Todo: Clean up. Fix overflowing text.

    const rootNode = useMemo(() => {
        const treemapLayout = d3.treemap<TreemapData>().tile(d3.treemapBinary).size([width, height]).round(true);
        const treemapHierarchy = d3
            .hierarchy(data)
            .sum((d) => d.value!)
            .sort((a, b) => b.value! - a.value!);
        return treemapLayout(treemapHierarchy);
    }, [width, height, data]);

    const treemapBounds = { left: 0, top: 0, right: Math.round(width), bottom: Math.round(height) };
    const margin = -1;
    const textPadding = 16;

    // Todo: Instead of drawing rects with strokes just draw individual lines and if both points lie on the svg bounds skip that line. This should avoid all of these weird margin shenanigans.
    const getNodeBounds = (node: d3.HierarchyRectangularNode<TreemapData>) => {
        const nodeBounds = new Aabb(node.x0, node.y0, node.x1, node.y1);
        if (nodeBounds.left === treemapBounds.left) nodeBounds.left += margin;
        if (nodeBounds.top === treemapBounds.top) nodeBounds.top += margin;
        if (nodeBounds.right === treemapBounds.right) nodeBounds.right = Math.ceil(nodeBounds.right - margin + 1);
        if (nodeBounds.bottom === treemapBounds.bottom) nodeBounds.bottom = Math.ceil(nodeBounds.bottom - margin + 1);
        return nodeBounds;
    };

    // Let the spaghetti begin:
    return (
        <svg width={width} height={height} className={styles.svg}>
            {rootNode.children?.map((node, index) => {
                const nodeBounds = getNodeBounds(node);
                const valueStr = node.data.valueFormatter(node.value!);

                const minWidthForText = 40;
                const minHeightForText = 30;

                return (
                    <g key={index} data-level="1">
                        {node.children?.map((node) => {
                            const nodeBounds = getNodeBounds(node);
                            const valueStr = node.data.valueFormatter(node.value!);

                            return (
                                <g key={node.id} data-level="2">
                                    <rect
                                        x={nodeBounds.left}
                                        y={nodeBounds.top}
                                        width={nodeBounds.width}
                                        height={nodeBounds.height}
                                        fill={'transparent'}
                                        stroke={'var(--font-color)'}
                                        strokeWidth={2}
                                    >
                                        <title>
                                            {node.data.label} {valueStr}
                                        </title>
                                    </rect>
                                    {nodeBounds.width > minWidthForText && nodeBounds.height > minHeightForText && (
                                        <>
                                            <clipPath id={`sub-clip-${node.data.id}`}>
                                                <rect
                                                    x={nodeBounds.left + textPadding / 2}
                                                    y={nodeBounds.top + textPadding / 2}
                                                    width={Math.max(0, nodeBounds.width - textPadding)}
                                                    height={Math.max(0, nodeBounds.height - textPadding)}
                                                />
                                            </clipPath>
                                            <text
                                                x={node.x0 + textPadding}
                                                y={node.y0 + textPadding}
                                                fill={'var(--font-color)'}
                                                fontSize={'16px'}
                                                dominantBaseline={'hanging'}
                                                clipPath={`url(#sub-clip-${node.data.id})`}
                                            >
                                                {nodeBounds.width > nodeBounds.height
                                                    ? node.data.label
                                                    : node.data.label?.split(' ').map((word, i) => {
                                                          return (
                                                              <tspan
                                                                  key={i}
                                                                  x={node.x0 + textPadding}
                                                                  y={node.y0 + textPadding + i * (16 * 1.5)}
                                                              >
                                                                  {word}
                                                              </tspan>
                                                          );
                                                      })}
                                            </text>
                                            <text
                                                x={node.x1 - textPadding}
                                                y={node.y1 - textPadding}
                                                textAnchor={'end'}
                                                fill={'var(--font-color)'}
                                                fontSize={'16px'}
                                                clipPath={`url(#sub-clip-${node.data.id})`}
                                            >
                                                {valueStr}
                                            </text>
                                        </>
                                    )}
                                </g>
                            );
                        })}

                        <g className={styles.level1Content}>
                            <rect
                                x={nodeBounds.left}
                                y={nodeBounds.top}
                                width={nodeBounds.width}
                                height={nodeBounds.height}
                                fill={'transparent'}
                                stroke={'var(--font-color)'}
                                strokeWidth={2}
                            >
                                <title>
                                    {node.data.label} {valueStr}
                                </title>
                            </rect>
                            {nodeBounds.width > minWidthForText && nodeBounds.height > minHeightForText && (
                                <>
                                    <clipPath id={`clip-${index}`}>
                                        <rect
                                            x={nodeBounds.left + textPadding / 2}
                                            y={nodeBounds.top + textPadding / 2}
                                            width={Math.max(0, nodeBounds.width - textPadding)}
                                            height={Math.max(0, nodeBounds.height - textPadding)}
                                            fill={'black'}
                                        />
                                    </clipPath>
                                    <text
                                        id={`url(#text-${index})`}
                                        x={node.x0 + textPadding}
                                        y={node.y0 + textPadding}
                                        fill={'var(--font-color)'}
                                        fontSize={'16px'}
                                        dominantBaseline={'hanging'}
                                        clipPath={`url(#clip-${index})`}
                                    >
                                        {node.data.label?.split(' ').map((word, i) => {
                                            return (
                                                <tspan
                                                    key={i}
                                                    x={node.x0 + textPadding}
                                                    y={node.y0 + textPadding + i * (16 * 1.5)}
                                                >
                                                    {word}
                                                </tspan>
                                            );
                                        })}
                                    </text>
                                    <text
                                        x={node.x1 - textPadding}
                                        y={node.y1 - textPadding}
                                        textAnchor={'end'}
                                        fill={'var(--font-color)'}
                                        fontSize={'16px'}
                                        clipPath={`url(#clip-${index})`}
                                    >
                                        {valueStr}
                                    </text>
                                </>
                            )}
                        </g>
                    </g>
                );
            })}
        </svg>
    );
};

export default Treemap;
