import React from 'react';
import LineChart from '../LineChart/LineChart';
import { CountryDatum, metaData, PisaScoreYears } from '../../../data/data';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import styles from './PisaScoreLineChart.module.scss';

export interface PisaScoreLineChartProps {
    data: CountryDatum[];
}

const PisaScoreLineChart = ({ data }: PisaScoreLineChartProps) => {
    return (
        <div className={styles.pisaLineChart}>
            PISA scores over the years.
            <div className={styles.chartContainer}>
                <ChartsWrapper
                    render={(dimensions) => (
                        <LineChart
                            width={dimensions.width}
                            height={dimensions.height}
                            data={[metaData.pisaScores, ...data.map((d) => d.pisaScores)]}
                            xAxis={{
                                label: 'Todo',
                                keys: metaData.pisaScores.years,
                            }}
                            yAxis={{
                                label: 'Score',
                                getValue: (scores, year) => {
                                    return scores[year as PisaScoreYears].average;
                                },
                                from: 0,
                                to: metaData.pisaScores.maxAverage,
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default PisaScoreLineChart;
