import React from 'react';
import styles from './DashboardCard.module.scss';
import cn from 'classnames';

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const DashboardCard = (props: DashboardCardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <div {...props} className={cn(styles.card, props.className)} ref={ref} />;
};

export default React.forwardRef(DashboardCard);
