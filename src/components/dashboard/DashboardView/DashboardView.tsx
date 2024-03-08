import React from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import { data, metaData } from '../../../data/data';
import MainGrid from '../../MainGrid/MainGrid';
import ScatterPlot from '../../charts/ScatterPlot/ScatterPlot';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import { useActiveCountry } from '../../../state/selectedCountry';
import { call } from '../../../tools/call';
import PisaScoreLineChart from '../../charts/PisaScoreLineChart/PisaScoreLineChart';
import Search from '../../Search/Search';
import { Link } from 'wouter';
import SkippedMealsWaffleChart from '../../charts/SkippedMealsWaffleChart/SkippedMealsWaffleChart';
import FoodCard from '../../FoodCard/FoodCard';

const DashboardView = () => {
    const activeCountry = useActiveCountry();

    return (
        <MainGrid>
            <DashboardCard area={'search'} color={'green'} style={{ zIndex: 1, padding: 0 }}>
                <Search />
            </DashboardCard>

            <DashboardCard area={'title'} color={'white'}>
                <h2>Food for thoughts?</h2>
                <p>
                    Research suggests that acute lack of nutritional resources can lead to reduced learning rates and
                    hindered cognitive abilities. Using this dashboard we can explore the connection between PISA scores
                    and various nourishment attributes of several countries.
                </p>
            </DashboardCard>

            <DashboardCard area={'about'} color={'pink'} style={{ aspectRatio: '1', height: '100%' }}>
                <Link href={'/about'}>About</Link>
            </DashboardCard>

            <DashboardCard area={'stats'} color={'black'}>
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
                <FoodCard />
            </DashboardCard>

            <DashboardCard area={'waffle'} color={'white'}>
                <SkippedMealsWaffleChart data={activeCountry} />
            </DashboardCard>

            <DashboardCard area={'line'} color={'green'}>
                <PisaScoreLineChart data={activeCountry ? [activeCountry] : []} />
            </DashboardCard>
        </MainGrid>
    );
};

export default DashboardView;
