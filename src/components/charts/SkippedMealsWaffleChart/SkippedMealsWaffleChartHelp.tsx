import React from 'react';
import { HelpTitle } from '../../dashboard/DashboardCard/Help';
import Help from '../../Help/Help';

const SkippedMealsWaffleChartHelp = () => {
    return (
        <Help>
            <HelpTitle>Meals skipped per week</HelpTitle>
            <strong>About this chart:</strong>
            <p>
                This shows the percentage of students skipping one or more meals per week. Skipping meals can result
                from many different reasons. In this case, the PISA study asked the students: &quot;In the past 30 days,
                how often did you not eat because there was not enough money to buy food?&quot;
            </p>
        </Help>
    );
};

export default SkippedMealsWaffleChartHelp;
