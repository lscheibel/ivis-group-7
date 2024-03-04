import React, { useState } from 'react';
import LineChart from '../LineChart/LineChart';
import { CountryDatum, metaData, PisaScoreYears } from '../../../data/data';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import styles from './PisaScoreLineChart.module.scss';
import { fromCamelCaseToUserFormat } from '../../../tools/stringsOperators';

export interface PisaScoreLineChartProps {
    data: CountryDatum[];
}

const PisaScoreLineChart = ({ data }: PisaScoreLineChartProps) => {
    //Filter types: 'average', 'math', 'reading', 'science'
    const pisaScoresLabels = ['Average', 'Math', 'Reading', 'Science'];
    const pisaScoresIcons = ['📊', '🧮', '🧪', '📚']; //TODO cnage for URL to SVGs.
    const [activeFilter, setActiveFilter] = useState('average');
    const [filtersState, setFilterState] = useState([1, 0, 0, 0]);

    function renderFilterButtons(label: string, index: number) {
        function filterHandler() {
            let temporalArray = [0, 0, 0, 0];
            temporalArray[index] = 1;
            setFilterState(temporalArray);
            setActiveFilter(label);
            console.log('activeFilter: ', activeFilter);
        }
        return (
            <button
                onClick={filterHandler}
                className={filtersState[index] == 1 ? styles.filterSelected : styles.filterUnselected}
            >
                <img src="" alt={`${pisaScoresIcons[index]}`} />
                {label}
            </button>
        );
    }
    //TODO update icons
    return (
        <div className={styles.pisaLineChart}>
            <h2>PISA scores over the years</h2>
            <div className={styles.row}>
                <div className={styles.filterContainer}>{pisaScoresLabels.map(renderFilterButtons)}</div>
                <div className={styles.visualStructureContainer}>
                    <div className={styles.legendsContainer}>
                        <p>PISA score (Higher is better)</p>
                        <div className={styles.legendContainer}>
                            <svg width="16px" height="16px" viewBox={`0, 0, 16, 16`}>
                                <rect width="100%" height="100%" fill="yellow" />
                            </svg>
                            <p> Ukrainian regions{/*TODO chnage for selected country*/}</p>
                        </div>
                        <div className={styles.legendContainer}>
                            <svg width="16px" height="16px" viewBox={`0, 0, 16, 16`}>
                                <rect width="100%" height="100%" fill="red" />
                            </svg>
                            <p> Global {/*TODO chnage for selected country*/}</p>
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
                                        label: 'Todo',
                                        keys: metaData.pisaScores.years,
                                    }}
                                    yAxis={{
                                        label: 'Score',
                                        getValue: (scores, year) => {
                                            const type = 'average'; // Todo: Let user choose type.
                                            return scores[year as PisaScoreYears][type];
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
