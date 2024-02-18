import React from 'react';
import styles from './MainGrid.module.scss';

export interface MainGridProps {
    children: React.ReactNode;
}

const MainGrid = ({ children }: MainGridProps) => {
    return <div className={styles.grid}>{children}</div>;
};

export default MainGrid;
