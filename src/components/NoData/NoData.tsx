import React from 'react';
import styles from './NoData.module.scss';

export interface NoDataProps {}

const NoData = ({}: NoDataProps) => {
    return <div className={styles.wrapper}>No data.</div>;
};

export default NoData;
