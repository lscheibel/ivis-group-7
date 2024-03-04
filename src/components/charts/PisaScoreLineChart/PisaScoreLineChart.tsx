import React, { useState } from 'react';
import LineChart from '../LineChart/LineChart';
import { CountryDatum, metaData, PisaScoreYears } from '../../../data/data';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import styles from './PisaScoreLineChart.module.scss';
import { fromCamelCaseToUserFormat } from '../../../tools/stringsOperators';
import { useSelectedCountry } from '../../../state/selectedCountry';

export interface PisaScoreLineChartProps {
    data: CountryDatum[];
}

const PisaScoreLineChart = ({ data }: PisaScoreLineChartProps) => {
    //Filter types: 'average', 'math', 'reading', 'science'
    const pisaScoresLabels = ['average', 'math', 'science', 'reading'];
    const pisaScoresIcons = ['📊', '🧮', '🧪', '📚']; //TODO cnage for URL to SVGs.
    const [activeFilter, setActiveFilter] = useState(pisaScoresLabels[0]);
    const [filtersState, setFilterState] = useState([1, 0, 0, 0]);
    const selectedCountry = useSelectedCountry();
    console.log(selectedCountry);

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
                {fromCamelCaseToUserFormat(label)}
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
                                        label: 'Todo',
                                        keys: metaData.pisaScores.years,
                                    }}
                                    yAxis={{
                                        label: 'Score',
                                        getValue: (scores, year) => {
                                            const type = activeFilter;
                                            return scores[year as PisaScoreYears][type]; //TODO Fix this typeScript ERROR
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
