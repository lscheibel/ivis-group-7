import React from 'react';
import styles from './DashboardCard.module.scss';
import cn from 'classnames';

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
    area: string;
    color: Theme;
    children: React.ReactNode;
}

export type Theme = 'red' | 'green' | 'pink' | 'black' | 'white';
export type ThemeVariables = 'background' | 'font-color' | 'font-color-secondary' | 'accent-color';
export type Themes = {
    [key in Theme]: {
        [key in `--${ThemeVariables}`]: string | number;
    };
};

const themes = {
    red: {
        '--background': 'var(--red)',
        '--font-color': 'var(--almost-black)',
        '--font-color-secondary': 'var(--almost-white)',
        '--accent-color': 'var(--white)',
    },
    green: {
        '--background': 'var(--green)',
        '--font-color': 'var(--almost-black)',
        '--font-color-secondary': 'var(--almost-white)',
        '--accent-color': 'var(--white)',
    },
    pink: {
        '--background': 'var(--pink)',
        '--font-color': 'var(--almost-black)',
        '--font-color-secondary': 'var(--almost-white)',
        '--accent-color': 'var(--white)',
    },
    black: {
        '--background': 'var(--black)',
        '--font-color': 'var(--almost-white)',
        '--font-color-secondary': 'var(--red)',
        '--accent-color': 'var(--red)',
    },
    white: {
        '--background': 'var(--almost-white)',
        '--font-color': 'var(--almost-black)',
        '--font-color-secondary': 'var(--red)',
        '--accent-color': 'var(--red)',
    },
} satisfies Themes;

const DashboardCard = (props: DashboardCardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <div
            {...props}
            style={{ gridArea: props.area, ...themes[props.color], ...props.style }}
            className={cn(styles.card, props.className)}
            ref={ref}
        />
    );
};

export default React.forwardRef(DashboardCard);
