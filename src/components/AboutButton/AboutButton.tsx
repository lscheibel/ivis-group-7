import React from 'react';
import { Link } from 'wouter';
import styles from './AboutButton.module.scss';

const AboutButton = () => {
    return (
        <Link className={styles.link} href={'/about'}>
            ?
        </Link>
    );
};

export default AboutButton;
