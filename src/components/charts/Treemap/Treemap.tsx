import React, { useMemo } from 'react';
import * as d3 from 'd3';
import styles from './Treemap.module.scss';
import { Aabb } from '../../../tools/Aabb';

export type TreemapData = {
    id: string;
    label: React.ReactNode;
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

    return (
        <svg width={width} height={height} className={styles.svg}>
            {rootNode.children?.map((node, index) => {
                const nodeBounds = getNodeBounds(node);

                return (
                    <g key={node.id} data-level="1">
                        {node.children?.map((node) => {
                            const nodeBounds = getNodeBounds(node);

                            return (
                                <g key={node.id} data-level="2">
                                    <rect
                                        x={nodeBounds.left}
                                        y={nodeBounds.top}
                                        width={nodeBounds.width}
                                        height={nodeBounds.height}
                                        stroke={'var(--almost-black)'}
                                        strokeWidth={2}
                                        fill={'transparent'}
                                    >
                                        <title>{node.data.title}</title>
                                    </rect>
                                    <text
                                        x={node.x1 - textPadding}
                                        y={node.y1 - textPadding}
                                        textAnchor={'end'}
                                        fill={'transparent'}
                                        fontSize={'16px'}
                                    >
                                        {node.data.label}
                                    </text>
                                </g>
                            );
                        })}

                        <rect
                            x={nodeBounds.left}
                            y={nodeBounds.top}
                            width={nodeBounds.width}
                            height={nodeBounds.height}
                            fill={'transparent'}
                            stroke={'var(--font-color)'}
                            strokeWidth={2}
                        />
                        <text
                            x={node.x0 + textPadding}
                            y={node.y0 + textPadding}
                            fill={'var(--font-color)'}
                            fontSize={'16px'}
                            dominantBaseline={'hanging'}
                        >
                            {node.data.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default Treemap;
