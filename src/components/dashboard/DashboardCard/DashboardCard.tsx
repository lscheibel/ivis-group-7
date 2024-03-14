import React, { useImperativeHandle, useRef, useState } from 'react';
import styles from './DashboardCard.module.scss';
import cn from 'classnames';
import { useHotkey } from '../../../tools/useHotkey';
import { getPointerPosition } from '../../../state/pointerPosition';

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
    area: string;
    color: Theme;
    help?: React.ReactNode;
    children: React.ReactNode;
}

export type Theme =
    | 'red'
    | 'green'
    | 'pink'
    | 'black'
    | 'white'
    | 'rose'
    | 'purple'
    | 'deepBlue'
    | 'turquoise'
    | 'yellow'
    | 'blue';
export type ThemeVariables = 'background' | 'font-color' | 'font-color-secondary' | 'accent-color';
export type Themes = {
    [key in Theme]: {
        [key in `--${ThemeVariables}`]: string | number;
    };
};

const themes = {
    red: {
        '--background': 'var(--red)',
        '--font-color': 'var(--black)',
        '--font-color-secondary': 'var(--almost-white)',
        '--accent-color': 'var(--white)',
    },
    green: {
        '--background': 'var(--green)',
        '--font-color': 'var(--black)',
        '--font-color-secondary': 'var(--almost-white)',
        '--accent-color': 'var(--white)',
    },
    pink: {
        '--background': 'var(--pink)',
        '--font-color': 'var(--black)',
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
    rose: {
        '--background': 'var(--rose)',
        '--font-color': 'var(--black)',
        '--font-color-secondary': 'var(--almost-white)',
        '--accent-color': 'var(--white)',
    },
    purple: {
        '--background': 'var(--purple)',
        '--font-color': 'var(--almost-white)',
        '--font-color-secondary': 'var(--black)',
        '--accent-color': 'var(--yellow)',
    },
    deepBlue: {
        '--background': 'var(--deep-blue)',
        '--font-color': 'var(--almost-white)',
        '--font-color-secondary': 'var(--blue)',
        '--accent-color': 'var(--blue)',
    },
    turquoise: {
        '--background': 'var(--turquoise)',
        '--font-color': 'var(--black)',
        '--font-color-secondary': 'var(--almost-white)',
        '--accent-color': 'var(--white)',
    },
    yellow: {
        '--background': 'var(--yellow)',
        '--font-color': 'var(--almost-black)',
        '--font-color-secondary': 'var(--white)',
        '--accent-color': 'var(--white)',
    },
    blue: {
        '--background': 'var(--blue)',
        '--font-color': 'var(--black)',
        '--font-color-secondary': 'var(--deep-blue)',
        '--accent-color': 'var(--almost-white)',
    },
} satisfies Themes;

const DashboardCard = (
    { area, color, ...props }: DashboardCardProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement);

    const [helpOpen, setHelpOpen] = useState(false);
    const toggleHelp = () => setHelpOpen(!helpOpen);

    useHotkey('Escape', () => {
        const wrapper = ref.current;
        if (!wrapper) return;
        if (!helpOpen) return;

        const focusWithin = wrapper.contains(document.activeElement);

        const pointerPos = getPointerPosition();
        const hoveredElement = pointerPos && document.elementFromPoint(pointerPos.screen.x, pointerPos.screen.y);
        const isHoveringHelp = wrapper === hoveredElement || wrapper.contains(hoveredElement);

        if (focusWithin || isHoveringHelp) setHelpOpen(false);
    });

    return (
        <div
            {...props}
            style={{ gridArea: area, ...themes[color], ...props.style }}
            className={cn(styles.card, props.className)}
            ref={ref}
        >
            {props.children}
            {props.help && (
                <>
                    <button className={styles.helpButton} onClick={toggleHelp}>
                        ?
                    </button>
                    {helpOpen && (
                        <div className={cn(styles.helpContainer, { [styles.open]: helpOpen })}>
                            <div className={styles.help}>{props.help}</div>
                            <button className={styles.helpDismiss} onClick={toggleHelp}>
                                okay
                            </button>

                            <button className={styles.secretDismiss} onClick={toggleHelp} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default React.forwardRef(DashboardCard);
