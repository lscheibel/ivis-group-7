import React from 'react';
import styles from './FoodCard.module.scss';
import AvailableFoodTreemap from '../charts/AvailableFoodTreemap/AvailableFoodTreemap';
import { useActiveCountry } from '../../state/selectedCountry';

const FoodCard = () => {
    const activeCountry = useActiveCountry();

    return (
        <div className={styles.container} style={{ position: 'relative', height: '100%' }}>
            <div className={styles.titles}>
                <h2>FOOD NUTRITION CHART</h2>
                <em>Median food consumed by 15–19 years olds in grams per day per capita.</em>
            </div>
            <div className={styles.chartContainer}>
                <AvailableFoodTreemap data={activeCountry} />
            </div>
        </div>
    );
};

export default FoodCard;
