import React, { useState } from 'react';
import LineChart from '../LineChart/LineChart';
import { CountryDatum, metaData, PisaScoreYears } from '../../../data/data';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import styles from './PisaScoreLineChart.module.scss';
import { useActiveCountry } from '../../../state/selectedCountry';

export interface PisaScoreLineChartProps {
    data: CountryDatum[];
}

const PisaScoreLineChart = ({ data }: PisaScoreLineChartProps) => {
    const pisaScoreFilters = ['average', 'math', 'science', 'reading'] as const;
    const [activeFilter, setActiveFilter] = useState<(typeof pisaScoreFilters)[number]>('average');
    const activeCountry = useActiveCountry();

    const legendItems = [
        ...data.map((d) => ({ name: d.countryName, color: 'var(--accent-color)' })),
        { name: 'Global', color: 'var(--font-color)' },
    ];

    //TODO update icons
    return (
        <div className={styles.pisaLineChart}>
            <div className={styles.titleContainer}>
                <h2>PISA scores over the years</h2>
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
            {/*<div className={styles.filterContainer}>*/}
            {/*    {pisaScoreFilters.map((filter, index) => {*/}
            {/*        return (*/}
            {/*            <button*/}
            {/*                key={filter}*/}
            {/*                onClick={() => setActiveFilter(filter)}*/}
            {/*                className={cn(styles.button, { [styles.filterSelected]: activeFilter === filter })}*/}
            {/*            >*/}
            {/*                <img src="" alt={`${pisaScoresIcons[index]}`} />*/}
            {/*                {fromCamelCaseToUserFormat(filter)}*/}
            {/*            </button>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</div>*/}
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
                                getValue: (scores, year) => {
                                    return scores[year as PisaScoreYears][activeFilter];
                                },
                                from: 0,
                                to: metaData.pisaScores.max[activeFilter],
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default PisaScoreLineChart;
