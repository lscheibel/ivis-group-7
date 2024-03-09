import React from 'react';
import LineChart from '../LineChart/LineChart';
import { CountryDatum, metaData, PisaScoreYears } from '../../../data/data';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import styles from './PisaScoreLineChart.module.scss';
import { usePisaScoreType } from '../../../state/pisaScoreType';

export interface PisaScoreLineChartProps {
    data: CountryDatum[];
}

const PisaScoreLineChart = ({ data }: PisaScoreLineChartProps) => {
    const pisaScoreType = usePisaScoreType();
    const legendItems = [
        ...data.map((d) => ({ name: d.countryName, color: 'var(--accent-color)' })),
        { name: 'Global', color: 'var(--font-color)' },
    ];

    return (
        <div className={styles.pisaLineChart}>
            <div className={styles.titleContainer}>
                <h2>{pisaScoreType} PISA scores over the years</h2>
                <div className={styles.legendContainer}>
                    {legendItems.map(({ name, color }) => {
                        return (
                            <div key={name} className={styles.legendItem}>
                                <svg width="16px" height="16px" viewBox={`0, 0, 16, 16`}>
                                    <line x1={0} x2={16} y1={8} y2={8} strokeWidth={2} stroke={color} />
                                </svg>
                                <span style={{ color }}>{name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.chartContainer}>
                <ChartsWrapper
                    render={(dimensions) => (
                        <LineChart
                            width={dimensions.width}
                            height={dimensions.height}
                            data={[metaData.pisaScores, ...data.map((d) => d.pisaScores)]}
                            xAxis={{
                                label: '',
                                keys: metaData.pisaScores.years,
                            }}
                            yAxis={{
                                label: 'SCORE',
                                getValue: (scores, year) => scores[year as PisaScoreYears][pisaScoreType],
                                from: 0,
                                to: metaData.pisaScores.max[pisaScoreType],
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default PisaScoreLineChart;
