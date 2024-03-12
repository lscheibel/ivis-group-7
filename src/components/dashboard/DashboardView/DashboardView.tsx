import React from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import { metaData } from '../../../data/data';
import MainGrid from '../../MainGrid/MainGrid';
import { useActiveCountry } from '../../../state/selectedCountry';
import PisaScoreLineChart from '../../charts/PisaScoreLineChart/PisaScoreLineChart';
import Search from '../../Search/Search';
import SkippedMealsWaffleChart from '../../charts/SkippedMealsWaffleChart/SkippedMealsWaffleChart';
import FoodCard from '../../FoodCard/FoodCard';
import Summary from '../../Summary/Summary';
import PisaScoreScatterPlot from '../../charts/PisaScoreScatterPlot/PisaScoreScatterPlot';
import AboutButton from '../../AboutButton/AboutButton';
import PisaScoreScatterPlotHelp from '../../charts/PisaScoreScatterPlot/PisaScoreScatterPlotHelp';
import SkippedMealsWaffleChartHelp from '../../charts/SkippedMealsWaffleChart/SkippedMealsWaffleChartHelp';
import PisaScoreLineChartHelp from '../../charts/PisaScoreLineChart/PisaScoreLineChartHelp';
import FoodCardHelp from '../../FoodCard/FoodCardHelp';
import SummaryHelp from '../../Summary/SummaryHelp';

const DashboardView = () => {
    const activeCountry = useActiveCountry();

    return (
        <MainGrid>
            <DashboardCard area={'search'} color={'green'} style={{ zIndex: 1, padding: 0 }}>
                <Search />
            </DashboardCard>

            <DashboardCard
                area={'title'}
                color={'white'}
                style={{ padding: 'var(--padding-large) var(--padding-huge)' }}
            >
                <h2 style={{ fontSize: '42px', textTransform: 'none' }}>Too Hungry to Learn?</h2>
                <p>
                    Using this dashboard we can explore the connection between PISA scores and various nourishment
                    attributes of several countries. Curiosity is rewarded ;)
                </p>
            </DashboardCard>

            <DashboardCard area={'about'} color={'green'} style={{ aspectRatio: '1', height: '100%' }}>
                <AboutButton />
            </DashboardCard>

            <DashboardCard area={'stats'} color={'black'} help={<SummaryHelp />}>
                <Summary data={activeCountry?.pisaScores || metaData.pisaScores} />
            </DashboardCard>

            <DashboardCard area={'scatter'} color={'red'} help={<PisaScoreScatterPlotHelp />}>
                <PisaScoreScatterPlot />
            </DashboardCard>

            <DashboardCard area={'food'} color={'black'} help={<FoodCardHelp />}>
                <FoodCard />
            </DashboardCard>

            <DashboardCard area={'waffle'} color={'white'} help={<SkippedMealsWaffleChartHelp />}>
                <SkippedMealsWaffleChart data={activeCountry} />
            </DashboardCard>

            <DashboardCard area={'line'} color={'green'} help={<PisaScoreLineChartHelp />}>
                <PisaScoreLineChart data={activeCountry ? [activeCountry] : []} />
            </DashboardCard>
        </MainGrid>
    );
};

export default DashboardView;
