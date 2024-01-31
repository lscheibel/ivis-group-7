import React, { CSSProperties } from 'react';

export interface SvgChartProps extends React.HTMLAttributes<SVGSVGElement> {
    width: number;
    height: number;
    className?: string;
    style?: CSSProperties;
}
