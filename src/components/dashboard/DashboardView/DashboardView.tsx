import React from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import styles from './DashboardView.module.scss';
import AverageSkillScoresCard from '../AverageSkillScoresCard/AverageSkillScoresCard';
import { metadata } from '../../../data/ivis-survey/data';
import cn from 'classnames';

export interface DashboardViewProps extends React.HTMLAttributes<HTMLDivElement> {
    exampleProp: string | null;
}

const DashboardView = ({ exampleProp, ...props }: DashboardViewProps) => {
    return (
        <div {...props} className={cn(styles.dashboardContainer, props.className)}>
            <AverageSkillScoresCard />
            <DashboardCard>
                <span>The max skill score is</span>
                <strong style={{ gridArea: 'maxScore', fontSize: '40px' }}>{metadata.maxSkillScore}</strong>
            </DashboardCard>
            <DashboardCard style={{ gridArea: 'description' }}>
                This is a long block of text for all your description needs. In general this entire layout is very
                flexible.
            </DashboardCard>
        </div>
    );
};

export default DashboardView;
