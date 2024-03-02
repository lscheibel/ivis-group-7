import React from 'react';
import * as d3 from 'd3';
import Tick from './Tick';

export interface AxisProps {
    x?: number;
    y?: number;
    axisScale: d3.ScaleContinuousNumeric<any, any>;
    ticks: number[];
    formatter?: (value: number) => React.ReactNode;
}

const Axis = ({ x, y, axisScale, ticks, formatter = (v) => v }: AxisProps) => {
    const [domainStart, domainEnd] = axisScale.domain();

    const x1 = x != null ? x : axisScale(domainStart);
    const x2 = x != null ? x : axisScale(domainEnd);
    const y1 = y != null ? y : axisScale(domainStart);
    const y2 = y != null ? y : axisScale(domainEnd);

    const tickDirection = x != null ? { left: true } : { down: true };

    return (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'var(--font-color)'} strokeWidth={2} />
            {ticks.map((tick, index) => {
                const posX = x != null ? x : axisScale(tick);
                const posY = y != null ? y : axisScale(tick);

                return <Tick key={index} x={posX} y={posY} {...tickDirection} text={formatter(tick)} textMargin={4} />;
            })}
        </g>
    );
};

export default Axis;
