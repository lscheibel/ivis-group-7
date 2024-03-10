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
                    Research suggests that acute lack of nutritional resources can lead to reduced learning rates and
                    hindered cognitive abilities. Using this dashboard we can explore the connection between PISA scores
                    and various nourishment attributes of several countries.
                </p>
            </DashboardCard>

            <DashboardCard area={'about'} color={'green'} style={{ aspectRatio: '1', height: '100%' }}>
                <AboutButton />
            </DashboardCard>

            <DashboardCard area={'stats'} color={'black'}>
                <Summary data={activeCountry?.pisaScores || metaData.pisaScores} />
            </DashboardCard>

            <DashboardCard area={'scatter'} color={'red'}>
                <PisaScoreScatterPlot />
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
