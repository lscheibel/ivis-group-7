import React from 'react';
import * as d3 from 'd3';
import HtmlForeignObject from '../../HtmlForeignObject/HtmlForeignObject';

export interface AxisLabelProps {
    xAxis?: boolean;
    yAxis?: boolean;
    axisScale: {
        x: d3.ScaleLinear<any, any> | d3.ScalePoint<string>;
        y: d3.ScaleLinear<any, any> | d3.ScalePoint<string>;
    };
    children: React.ReactNode;
    inlineMargin?: number;
    blockMargin?: number;
}

const AxisLabel = ({ xAxis, yAxis, axisScale, inlineMargin = 32, blockMargin = 8, children }: AxisLabelProps) => {
    const x = axisScale.x.range()[0];
    const y = axisScale.y.range()[0];

    const xMargin = xAxis ? inlineMargin : yAxis ? blockMargin : 0;
    const yMargin = xAxis ? blockMargin : yAxis ? inlineMargin : 0;

    const rotation = yAxis ? '-90deg' : '0deg';
    const verticalAlignment = yAxis ? 'hanging' : 'baseline';

    return (
        <text
            style={{
                transform: `translate(${x + xMargin}px, ${y - yMargin}px) rotate(${rotation})`,
            }}
            alignmentBaseline={verticalAlignment}
            textAnchor={'start'}
            fill={'var(--font-color)'}
        >
            {children}
        </text>
    );
};

export default AxisLabel;
