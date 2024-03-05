import React, { useState } from 'react';
import LineChart from '../LineChart/LineChart';
import { CountryDatum, metaData, PisaScoreYears } from '../../../data/data';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import styles from './PisaScoreLineChart.module.scss';
import { fromCamelCaseToUserFormat } from '../../../tools/stringsOperators';
import { useSelectedCountry } from '../../../state/selectedCountry';
import cn from 'classnames';

export interface PisaScoreLineChartProps {
    data: CountryDatum[];
}

const PisaScoreLineChart = ({ data }: PisaScoreLineChartProps) => {
    const pisaScoreFilters = ['average', 'math', 'science', 'reading'] as const;
    const pisaScoresIcons = ['📊', '🧮', '🧪', '📚']; // TODO change for URL to SVGs.
    const [activeFilter, setActiveFilter] = useState<(typeof pisaScoreFilters)[number]>('average');
    const selectedCountry = useSelectedCountry();

    //TODO update icons
    return (
        <div className={styles.pisaLineChart}>
            <h2>PISA scores over the years</h2>
            <div className={styles.row}>
                <div className={styles.filterContainer}>
                    {pisaScoreFilters.map((filter, index) => {
                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(styles.button, { [styles.filterSelected]: activeFilter === filter })}
                            >
                                <img src="" alt={`${pisaScoresIcons[index]}`} />
                                {fromCamelCaseToUserFormat(filter)}
                            </button>
                        );
                    })}
                </div>
                <div className={styles.visualStructureContainer}>
                    <div className={styles.legendsContainer}>
                        <p>PISA score (higher the better)</p>
                        {selectedCountry !== null ? (
                            <div className={styles.legendContainer}>
                                <svg width="16px" height="16px" viewBox={`0, 0, 16, 16`}>
                                    <rect width="100%" height="100%" fill="#FFCB00" />
                                </svg>
                                <p> {selectedCountry?.countryName}</p>
                            </div>
                        ) : null}
                        <div className={styles.legendContainer}>
                            <svg width="16px" height="16px" viewBox={`0, 0, 16, 16`}>
                                <rect width="100%" height="100%" fill="#F22F29" />
                            </svg>
                            <p> Global</p>
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
                                        label: 'Score',
                                        getValue: (scores, year) => {
                                            return scores[year as PisaScoreYears][activeFilter];
                                        },
                                        from: 0,
                                        to: metaData.pisaScores.maxAverage,
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PisaScoreLineChart;
