import React from 'react';
import LineChart from '../LineChart/LineChart';
import { CountryDatum, metaData } from '../../../data/data';

export interface PisaScoreLineChartProps {
    width: number;
    height: number;
    data: CountryDatum[];
}

const PisaScoreLineChart = ({ width, height, data }: PisaScoreLineChartProps) => {
    return (
        <LineChart
            width={width}
            height={height}
            data={data}
            xAxis={{
                label: 'Todo',
                keys: ['2008', '2012', '2055'],
            }}
            yAxis={{
                label: 'Todo',
                getValue: (c, key) => {
                    return metaData.pisaScores.average;
                    // return c.pisaScores[key]; // Todo: Get data over the years.
                },
                from: 0,
                to: metaData.pisaScores.maxAverage,
            }}
        />
    );
};

export default PisaScoreLineChart;
