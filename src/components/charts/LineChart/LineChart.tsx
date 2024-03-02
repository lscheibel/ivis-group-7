import React from 'react';
import { CountryDatum } from '../../../data/data';

export interface XAxisDefinition {
    keys: Array<number | string>;
    label: React.ReactNode;
}

export interface YAxisDefinition {
    getValue: (country: CountryDatum, key: string | number) => number | Nullish;
    from: number;
    to: number;
    label: React.ReactNode;
}

export interface LineChartProps {
    width: number;
    height: number;
    data: CountryDatum[];
    xAxis: XAxisDefinition;
    yAxis: YAxisDefinition;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

const LineChart = ({ width, height, data, yAxis, xAxis, margin }: LineChartProps) => {
    return <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}></svg>;
};

export default LineChart;
