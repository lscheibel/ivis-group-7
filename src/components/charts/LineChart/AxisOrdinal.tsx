import * as d3 from 'd3';
import Tick from '../ScatterPlot/Tick';
import React from 'react';

export interface AxisOrdinalProps {
    x?: number;
    y?: number;
    axisScale: d3.ScalePoint<string>;
}

const AxisOrdinal = ({ x, y, axisScale }: AxisOrdinalProps) => {
    const ticks = axisScale.domain();
    const [rangeStart, rangeEnd] = axisScale.range();

    const x1 = x != null ? x : rangeStart;
    const x2 = x != null ? x : rangeEnd;
    const y1 = y != null ? y : rangeStart;
    const y2 = y != null ? y : rangeEnd;

    const tickDirection = x != null ? { left: true } : { down: true };

    return (
        <g>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={'var(--font-color)'}
                strokeWidth={2}
                strokeLinecap={'square'}
            />
            {ticks.map((tick, index) => {
                const posX = x != null ? x : axisScale(tick);
                const posY = y != null ? y : axisScale(tick);

                if (posX == null || posY == null) return null;

                return <Tick key={index} x={posX} y={posY} {...tickDirection} text={tick} textMargin={4} />;
            })}
        </g>
    );
};

export default AxisOrdinal;
