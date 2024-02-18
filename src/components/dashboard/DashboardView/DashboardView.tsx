import React from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import { data, metaData } from '../../../data/data';
import MainGrid from '../../MainGrid/MainGrid';
import ScatterPlot from '../../charts/ScatterPlot/ScatterPlot';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import ParentalSupportScatterPlot from '../../charts/ParentalSupportScatterPlot/ParentalSupportScatterPlot';
import { useActiveCountry } from '../../../state/selectedCountry';
import NutritionalTable from '../../nutritional-table/NutritionalTable';
import { call } from '../../../tools/call';

const DashboardView = () => {
    const activeCountry = useActiveCountry();

    return (
        <MainGrid>
            <DashboardCard area={'redBox1'} color={'red'} style={{ aspectRatio: 1, height: '100%' }}>
                <ChartsWrapper
                    style={{ inset: 'var(--padding-large)' }}
                    render={(dimensions) => (
                        <ScatterPlot
                            width={dimensions.width}
                            height={dimensions.height}
                            data={data}
                            axis={{
                                x: {
                                    label: 'SKIPPED AT LEAST ONE MEAL PER WEEK',
                                    getValue: (c) => c.skippedMealAtLeastOnce,
                                    from: 0,
                                    to: 100,
                                },
                                y: {
                                    label: 'AVERAGE PISA SCORE',
                                    getValue: (c) => c.pisaScores.average,
                                    from: 0,
                                    to: metaData.pisaScores.maxAverage,
                                },
                            }}
                        />
                    )}
                />
            </DashboardCard>

            <DashboardCard area={'blackBox2'} color={'black'}>
                Tiny Math Scatter
            </DashboardCard>

            <DashboardCard area={'blackBox3'} color={'black'}>
                Tiny Reading Scatter
            </DashboardCard>

            <DashboardCard area={'blackBox4'} color={'black'}>
                Tiny Science Scatter
            </DashboardCard>

            <DashboardCard area={'greenBox1'} color={'green'}>
                {activeCountry?.countryName || 'Global'}
            </DashboardCard>

            <DashboardCard area={'whiteBox1'} color={'white'}>
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

            <DashboardCard area={'pinkBox1'} color={'pink'}>
                <ChartsWrapper
                    style={{ inset: 'var(--padding-large)' }}
                    render={(dimensions) => (
                        <ParentalSupportScatterPlot width={dimensions.width} height={dimensions.height} data={data} />
                    )}
                />
            </DashboardCard>

            <DashboardCard area={'blackBox1'} color={'black'}>
                <div style={{ position: 'absolute', inset: 'var(--padding-large)', overflow: 'auto' }}>
                    {activeCountry && <NutritionalTable data={activeCountry} />}
                </div>
            </DashboardCard>
        </MainGrid>
    );
};

export default DashboardView;
