import React from 'react';

export interface TickProps {
    x: number;
    y: number;
    up?: boolean;
    down?: boolean;
    left?: boolean;
    right?: boolean;
    text: React.ReactNode;
    textMargin?: number;
    color?: string;
}

const Tick = ({ x, y, up, down, left, right, text, textMargin = 0, color = 'var(--font-color)' }: TickProps) => {
    const tickLength = 6;

    const xDir = left ? -1 : right ? 1 : 0;
    const yDir = up ? -1 : down ? 1 : 0;

    const x2 = x + tickLength * xDir;
    const y2 = y + tickLength * yDir;

    const textX = x2 + textMargin * xDir;
    const textY = y2 + textMargin * yDir;

    const textAlignX = xDir === 1 ? 'start' : xDir === -1 ? 'end' : 'middle';
    const textAlignY = yDir === 1 ? 'text-before-edge' : yDir === -1 ? 'text-after-edge' : 'middle';

    return (
        <React.Fragment>
            <line x1={x} y1={y} x2={x2} y2={y2} strokeWidth={'var(--stroke-width, 2)'} stroke={color} />

            <text x={textX} y={textY} textAnchor={textAlignX} alignmentBaseline={textAlignY} fill={color}>
                {text}
            </text>
        </React.Fragment>
    );
};

export default Tick;
