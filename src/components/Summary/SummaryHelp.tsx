import React from 'react';
import Help from '../Help/Help';
import { HelpTitle } from '../dashboard/DashboardCard/Help';

const SummaryHelp = () => {
    return (
        <Help>
            <HelpTitle>PISA Score Metrics</HelpTitle>
            <strong>About this chart:</strong>
            <p>
                Here the score of the PISA test is displayed and compared to the world global. The PISA score is graded
                on a 0-600 scale, with 0 being the worst and 600 being the best score possible.
            </p>
        </Help>
    );
};

export default SummaryHelp;
