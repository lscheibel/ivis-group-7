import React from 'react';
import styles from './App.module.scss';
import DashboardView from '../dashboard/DashboardView/DashboardView';
import { Route } from 'wouter';
import About from '../About/About';

const App = () => {
    return (
        <div className={styles.wrapper}>
            <DashboardView />
            <Route path={'/about'}>
                <About />
            </Route>
        </div>
    );
};

export default App;
