import React from 'react';
import styles from './App.module.scss';
import DashboardView from '../dashboard/DashboardView/DashboardView';
import { useSelectedCountry } from '../../state/selectedCountry';
import { Link, Route } from 'wouter';

const App = () => {
    const selectedCountry = useSelectedCountry();

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
                <DashboardView exampleProp={selectedCountry} />
            </Route>
        </div>
    );
};

export default App;
