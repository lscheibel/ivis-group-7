import React from 'react';
import { HelpTitle } from '../../dashboard/DashboardCard/Help';
import Help from '../../Help/Help';

const SkippedMealsWaffleChartHelp = () => {
    return (
        <Help>
            <HelpTitle>Meals skipped per week</HelpTitle>
            <strong>About this chart:</strong>
            <p>
                This shows the percentage of students skipping one or more meals per week. Skipping meals can be the
                result of many different reasons, the PISA study does not take into consideration the reason for a
                skipped meal, only the amount of skipped meals per week.
            </p>
        </Help>
    );
};

export default SkippedMealsWaffleChartHelp;