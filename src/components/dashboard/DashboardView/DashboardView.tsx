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
import { HelpTitle } from '../DashboardCard/Help';
import { usePisaScoreType } from '../../../state/pisaScoreType';

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
                    hindered cognitive abilities.
                </p>
            </DashboardCard>

            <DashboardCard area={'about'} color={'green'} style={{ aspectRatio: '1', height: '100%' }}>
                <AboutButton />
            </DashboardCard>

            <DashboardCard
                area={'stats'}
                color={'black'}
                help={
                    <>
                        <HelpTitle>All the pisa scores</HelpTitle>
                        <p>This card shows you things.</p>
                    </>
                }
            >
                <Summary data={activeCountry?.pisaScores || metaData.pisaScores} />
            </DashboardCard>

            <DashboardCard area={'scatter'} color={'red'} help={<HelpTitle>*Info about this chart*</HelpTitle>}>
                <PisaScoreScatterPlot />
            </DashboardCard>

            <DashboardCard area={'food'} color={'black'} help={<HelpTitle>*Info about this chart*</HelpTitle>}>
                <FoodCard />
            </DashboardCard>

            <DashboardCard area={'waffle'} color={'white'} help={<HelpTitle>*Info about this chart*</HelpTitle>}>
                <SkippedMealsWaffleChart data={activeCountry} />
            </DashboardCard>

            <DashboardCard area={'line'} color={'green'} help={<HelpTitle>*Info about this chart*</HelpTitle>}>
                <PisaScoreLineChart data={activeCountry ? [activeCountry] : []} />
            </DashboardCard>
        </MainGrid>
    );
};

export default DashboardView;
