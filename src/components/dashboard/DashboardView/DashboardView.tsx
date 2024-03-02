import React from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import { data, metaData } from '../../../data/data';
import MainGrid from '../../MainGrid/MainGrid';
import ScatterPlot from '../../charts/ScatterPlot/ScatterPlot';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import ParentalSupportScatterPlot from '../../charts/ParentalSupportScatterPlot/ParentalSupportScatterPlot';
import { useActiveCountry } from '../../../state/selectedCountry';
import { call } from '../../../tools/call';
import AvailableFoodTreemap from '../../charts/AvailableFoodTreemap/AvailableFoodTreemap';
import PisaScoreLineChart from '../../charts/PisaScoreLineChart/PisaScoreLineChart';

const DashboardView = () => {
    const activeCountry = useActiveCountry();

    return (
        <MainGrid>
            <DashboardCard area={'title'} color={'pink'}>
                <h2>Food for thoughts?</h2>
            </DashboardCard>

            <DashboardCard area={'about'} color={'black'} style={{ aspectRatio: '3 / 2', height: '100%' }}>
                About
            </DashboardCard>

            <DashboardCard area={'search'} color={'green'}>
                Search: {activeCountry?.countryName || 'Global'}
            </DashboardCard>

            <DashboardCard area={'stats'} color={'white'}>
                Pisa Scores
                <br />
                {activeCountry?.countryName || 'Global'}
                {call(() => {
                    const data = activeCountry?.pisaScores || metaData.pisaScores;

                    return (
                        <ul>
                            <li>Average: {Math.round(data.average)}</li>
                            <li>Math: {Math.round(data.math)}</li>
                            <li>Reading: {Math.round(data.reading)}</li>
                            <li>Science: {Math.round(data.science)}</li>
                        </ul>
                    );
                })}
            </DashboardCard>

            <DashboardCard area={'scatter'} color={'red'}>
                <ChartsWrapper
                    style={{ inset: 'var(--padding-large)' }}
                    render={(dimensions) => (
                        <ScatterPlot
                            width={dimensions.width}
                            height={dimensions.height}
                            data={data}
                            xAxis={{
                                label: 'SKIPPED AT LEAST ONE MEAL PER WEEK',
                                getValue: (c) => c.skippedMealAtLeastOnce,
                                from: 0,
                                to: 100,
                            }}
                            yAxis={{
                                label: 'AVERAGE PISA SCORE',
                                getValue: (c) => c.pisaScores.average,
                                from: 0,
                                to: metaData.pisaScores.maxAverage,
                            }}
                        />
                    )}
                />
            </DashboardCard>

            <DashboardCard area={'food'} color={'black'}>
                <AvailableFoodTreemap data={activeCountry ? [activeCountry] : []} />
            </DashboardCard>

            <DashboardCard area={'waffle'} color={'black'}>
                🧇
            </DashboardCard>

            <DashboardCard area={'line'} color={'white'}>
                <ChartsWrapper
                    render={(dimensions) => (
                        <PisaScoreLineChart {...dimensions} data={activeCountry ? [activeCountry] : []} />
                    )}
                />
            </DashboardCard>
        </MainGrid>
    );
};

export default DashboardView;
