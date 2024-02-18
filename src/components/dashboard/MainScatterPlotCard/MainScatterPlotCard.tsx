import React, { useRef } from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import ScatterPlot from '../../charts/ScatterPlot/ScatterPlot';
import { data, metaData } from '../../../data/data';
import { useDomNodeDimensions } from '../../../tools/useDomNodeDimensions';
import styles from './MainScatterPlotCard.module.scss';

const MainScatterPlotCard = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const dimensions = useDomNodeDimensions(ref);

    return (
        <DashboardCard style={{ gridColumn: 'span 2' }}>
            <div className={styles.chartWrapper} ref={ref}>
                {dimensions && (
                    <ScatterPlot
                        width={dimensions.width}
                        height={dimensions.height}
                        data={data}
                        axis={{
                            x: {
                                label: 'SKIPPED AT LEAST ONE MEAL PER WEEK',
                                getValue: (c) => c.skippedMealAtLeastOnce,
                                from: 0,
                                to: 100,
                            },
                            y: {
                                label: 'AVERAGE PISA SCORE',
                                getValue: (c) => c.pisaScores.average,
                                from: 0,
                                to: metaData.pisaScores.maxAverage,
                            },
                        }}
                    />
                )}
            </div>
        </DashboardCard>
    );
};

export default React.memo(MainScatterPlotCard);
