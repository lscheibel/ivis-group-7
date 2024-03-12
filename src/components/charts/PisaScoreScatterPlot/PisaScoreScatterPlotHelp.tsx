import React from 'react';
import { HelpTitle } from '../../dashboard/DashboardCard/Help';
import Help from '../../Help/Help';

const PisaScoreScatterPlotHelp = () => {
    return (
        <Help>
            <HelpTitle>PISA Score & Skipped at Least One Meal per Week</HelpTitle>

            <strong>How to use:</strong>
            <p>
                Each dot represents a country or region. Hover over a dot to see the name of the country/region and get
                quick insights into the PISA scores for that dot. For more in-depth data, select a country/region by
                clicking on it. The other graphs will then be updated with more in-depth information about the selected
                country.
            </p>
            <strong>About this graph:</strong>
            <p>
                This scatter plot shows the correlations between the average PISA score for each country and other
                parameters. The PISA score is graded on a 0-600 scale, with 0 being the worst and 600 being the best
                score possible. Note that only 81 countries/regions of the world total countries took part in the PISA
                study.
            </p>
            <strong>Percentage of students skipping at least one meal per week:</strong>
            <p>
                Within the PISA research, the students had to answer questions about their weekly food routines. This
                parameter shows how many students skipped at least one meal per week.
            </p>
            <strong>Number of times parents ask about students&apos; school day:</strong>
            <p>
                Parents play a vital part of a child&apos;s well-being and influence their grades. This parameter shows
                how invested a parent is in their children&apos;s school day. This parameter shows the percentage of
                students who reported that every day or almost every day their parents or someone in their family asks
                them what they did in school that day.
            </p>
            <strong>Sense of belonging to school:</strong>
            <p>
                The sense of belonging and feeling safe is vital to a child’s progress in school. This parameter shows
                to what degree the children feel a sense of belonging at school and that the school feels like a safe
                study environment.
            </p>
        </Help>
    );
};

export default PisaScoreScatterPlotHelp;
