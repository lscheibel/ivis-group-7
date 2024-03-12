import React from 'react';
import { HelpTitle } from '../dashboard/DashboardCard/Help';
import Help from '../Help/Help';

const FoodCardHelp = () => {
    return (
        <Help>
            <HelpTitle>Food Availability Tree Map</HelpTitle>
            <strong>About this chart:</strong>
            <p>
                The nutrition mix shows the amount of food consumed per capita in grams in the country, focusing solely
                on the age group (15–19 years old). It displays the median value in grams consumed per day per person.
                This data is relative to the year 2018 and was downloaded from{' '}
                <a href={'https://globaldietarydatabase.org/'}>Global Dietary Database</a>. The median value means that
                half of the population in that age group consumes more than that value, and the other half consumes
                less.
            </p>
        </Help>
    );
};

export default FoodCardHelp;
