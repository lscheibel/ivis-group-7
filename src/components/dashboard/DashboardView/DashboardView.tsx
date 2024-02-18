import React from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import styles from './DashboardView.module.scss';
import cn from 'classnames';
import MainScatterPlotCard from '../MainScatterPlotCard/MainScatterPlotCard';
import { useActiveCountry } from '../../../state/selectedCountry';
import { metaData } from '../../../data/data';
import ParentalSupportChartCard from '../ParentalSupportChartCard/ParentalSupportChartCard';

export interface DashboardViewProps extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardView = ({ ...props }: DashboardViewProps) => {
    const activeCountry = useActiveCountry();

    return (
        <div {...props} className={cn(styles.dashboardContainer, props.className)}>
            <MainScatterPlotCard />
            <DashboardCard>
                {activeCountry ? (
                    <span>
                        {activeCountry.countryName}&apos;s average PISA score is: {activeCountry.pisaScores.average}
                    </span>
                ) : (
                    <span>Here is some global pisa data :) Average Pisa Score: {metaData.averagePisaScore}</span>
                )}
            </DashboardCard>
            <DashboardCard style={{ gridArea: 'description' }}>
                This is a long block of text for all your description needs. In general this entire layout is very
                flexible.
            </DashboardCard>
            <ParentalSupportChartCard />
        </div>
    );
};

export default DashboardView;
