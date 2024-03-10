import React, { useRef } from 'react';
import { useDomNodeDimensions } from '../../tools/useDomNodeDimensions';

export interface HtmlForeignObjectProps extends React.SVGAttributes<SVGForeignObjectElement> {
    x: number;
    y: number;
    children: React.ReactNode;
    anchorX?: 'left' | 'center' | 'right';
    anchorY?: 'top' | 'center' | 'bottom';
}

const HtmlForeignObject = ({ x, y, children, anchorX = 'left', anchorY = 'top', ...props }: HtmlForeignObjectProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const dimensions = useDomNodeDimensions(ref);

    const posX =
        anchorX === 'right'
            ? x - (dimensions?.width || 0)
            : anchorX === 'center'
            ? x - (dimensions?.width || 0) / 2
            : x;
    const posY =
        anchorY === 'bottom'
            ? y - (dimensions?.height || 0)
            : anchorY === 'center'
            ? y - (dimensions?.height || 0) / 2
            : y;

    return (
        <foreignObject x={posX} y={posY} {...dimensions} {...props}>
            <div
                ref={ref}
                style={{
                    width: 'fit-content',
                    height: 'fit-content',
                    overflow: 'hidden', // Allows children to define a margin and overflow will be hidden anyway.
                }}
            >
                {children}
            </div>
        </foreignObject>
    );
};

export default HtmlForeignObject;
