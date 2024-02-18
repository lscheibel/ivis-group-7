import React from 'react';
import styles from './App.module.scss';
import DashboardView from '../dashboard/DashboardView/DashboardView';
import { useActiveCountry } from '../../state/selectedCountry';
import { Link, Route } from 'wouter';
import NutritionalTable from '../nutritional-table/NutritionalTable';

const App = () => {
    const activeCountry = useActiveCountry();

    return (
        <div className={styles.wrapper}>
            Navigation:{' '}
            <ul>
                <li>
                    <Link href={'/'}>Data</Link>
                </li>
                <li>
                    <Link href={'/about'}>About</Link>
                </li>
            </ul>
            <Route path={'/about'}>About us, Todo.</Route>
            <Route path={'/'}>
                <DashboardView />
                {activeCountry ? <NutritionalTable data={activeCountry} /> : null}
            </Route>
        </div>
    );
};

export default App;
