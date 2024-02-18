import React, { useRef } from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import { useDomNodeDimensions } from '../../../tools/useDomNodeDimensions';
import styles from '../MainScatterPlotCard/MainScatterPlotCard.module.scss';
import { data } from '../../../data/data';
import ParentalSupportScatterPlot from '../../charts/ParentalSupportScatterPlot/ParentalSupportScatterPlot';

const ParentalSupportChartCard = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const dimensions = useDomNodeDimensions(ref);

    return (
        <DashboardCard>
            <div className={styles.chartWrapper} ref={ref}>
                {dimensions && (
                    <ParentalSupportScatterPlot width={dimensions.width} height={dimensions.height} data={data} />
                )}
            </div>
        </DashboardCard>
    );
};

export default ParentalSupportChartCard;
