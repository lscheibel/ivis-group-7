import React from 'react';
import Help from '../../Help/Help';
import { HelpTitle } from '../../dashboard/DashboardCard/Help';

const PisaScoreLineChartHelp = () => {
    return (
        <Help>
            <HelpTitle>PISA Scores Over the Years</HelpTitle>
            <strong>About this chart:</strong>
            <p>
                This line graph shows how the PISA score has developed over time. If no country is chosen the graph will
                only show the global average, select a country to compare it to the global average.
            </p>
        </Help>
    );
};

export default PisaScoreLineChartHelp;
