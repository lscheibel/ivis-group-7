import React from 'react';
import * as d3 from 'd3';

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
    const xMargin = xAxis ? inlineMargin : yAxis ? blockMargin : 0;
    const yMargin = xAxis ? blockMargin : yAxis ? inlineMargin : 0;

    const rotation = yAxis ? '-90deg' : '0deg';
    const verticalAlignment = yAxis ? 'hanging' : 'baseline';

    return (
        <text
            style={{
                transform: `translate(${axisScale.x.range()[0] + xMargin}px, ${
                    axisScale.y.range()[0] - yMargin
                }px) rotate(${rotation})`,
            }}
            alignmentBaseline={verticalAlignment}
            textAnchor={'start'}
        >
            {children}
        </text>
    );
};

export default AxisLabel;
