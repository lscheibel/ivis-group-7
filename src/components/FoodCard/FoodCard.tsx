import React from 'react';
import styles from './FoodCard.module.scss';
import AvailableFoodTreemap from '../charts/AvailableFoodTreemap/AvailableFoodTreemap';
import { useActiveCountry } from '../../state/selectedCountry';

const FoodCard = () => {
    const activeCountry = useActiveCountry();

    return (
        <div className={styles.container} style={{ position: 'relative', height: '100%' }}>
            <div className={styles.titles}>
                <h2>FOOD AVAILABILITY TREE</h2>
                <em>Food available for consumption in kilocalories per day per capita</em>
            </div>
            <div className={styles.chartContainer}>
                <AvailableFoodTreemap data={activeCountry ? [activeCountry] : []} />
            </div>
        </div>
    );
};

export default FoodCard;
