import React from 'react';
import styles from './App.module.scss';
import DashboardView from '../dashboard/DashboardView/DashboardView';
import { useSelectedCountry } from '../../state/selectedCountry';

const App = () => {
    const selectedCountry = useSelectedCountry();

    return (
        <div className={styles.wrapper}>
            <DashboardView exampleProp={selectedCountry} />
        </div>
    );
};

export default App;
