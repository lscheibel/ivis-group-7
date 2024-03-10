import React from 'react';
import styles from './Help.module.scss';

export interface HelpProps {
    children: React.ReactNode;
}

const Help = ({ children }: HelpProps) => {
    return <div className={styles.container}>{children}</div>;
};

export default Help;
