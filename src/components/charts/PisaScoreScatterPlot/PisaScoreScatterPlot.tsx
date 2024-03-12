import React from 'react';
import styles from './PisaScoreScatterPlot.module.scss';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import ScatterPlot from '../ScatterPlot/ScatterPlot';
import { data, metaData } from '../../../data/data';
import { usePisaScoreType } from '../../../state/pisaScoreType';

const PisaScoreScatterPlot = () => {
    const pisaScoreType = usePisaScoreType();

    return (
        <div className={styles.chartContainer}>
            <ChartsWrapper
                style={{ inset: 0 }}
                render={(dimensions) => (
                    <ScatterPlot
                        width={dimensions.width}
                        height={dimensions.height}
                        data={data}
                        xAxis={[
                            {
                                label: 'SKIPPED AT LEAST ONE MEAL PER WEEK',
                                getValue: (c) => c.skippedMealAtLeastOnce,
                                formatter: (t) => `${Math.round(t.value)}%`,
                                from: 0,
                                to: 100,
                            },
                            {
                                label: 'PARENTS FREQUENTLY ASK ABOUT DAY',
                                getValue: (c) => c.parentsFrequentlyAskingAboutDay,
                                formatter: (t) => `${Math.round(t.value)}%`,
                                from: 0,
                                to: 100,
                            },
                            // {
                            //     label: 'FAMILY SUPPORT',
                            //     getValue: (c) => c.familySupport,
                            //     formatter: (t) => `${Math.round(t.value * 10) / 10}`,
                            //     from: -0.5,
                            //     to: 0.5,
                            // },
                            {
                                label: 'SENSE OF BELONGING TO SCHOOL',
                                getValue: (c) => c.senseOfBelonging,
                                formatter: (t) => `${Math.round(t.value * 10) / 10}`,
                                from: -0.5,
                                to: 0.5,
                            },
                        ]}
                        yAxis={{
                            label: `${pisaScoreType.toLocaleUpperCase()} PISA SCORE`,
                            getValue: (c) => c.pisaScores[pisaScoreType],
                            formatter: (t) => Math.round(t.value),
                            from: 0,
                            to: metaData.pisaScores.max[pisaScoreType],
                        }}
                    />
                )}
            />
        </div>
    );
};

export default PisaScoreScatterPlot;
