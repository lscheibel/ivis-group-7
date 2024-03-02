import React from 'react';
import styles from './App.module.scss';
import DashboardView from '../dashboard/DashboardView/DashboardView';
import { Link, Route } from 'wouter';

const App = () => {
    return (
        <div className={styles.wrapper}>
            <Route path={'/about'}>About us, Todo.</Route>
            <Route path={'/'}>
                <DashboardView />
            </Route>
        </div>
    );
};

export default App;
