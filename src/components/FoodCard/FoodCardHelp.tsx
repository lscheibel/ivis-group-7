import React from 'react';
import { HelpTitle } from '../dashboard/DashboardCard/Help';
import Help from '../Help/Help';

const FoodCardHelp = () => {
    return (
        <Help>
            <HelpTitle>Food Availability Tree Map</HelpTitle>
            <strong>About this chart:</strong>
            <p>
                The nutrition mix shows the amount that is consumed in the country per capita, this includes all age
                groups not only High School students. It is calculated kcal per capita and is divided into several food
                groups.
            </p>
        </Help>
    );
};

export default FoodCardHelp;
