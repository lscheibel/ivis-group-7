import React, { useMemo, useState } from 'react';
import styles from './SkippedMealsWaffleChart.module.scss';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import WaffleChart from '../WaffleChart/WaffleChart';
import { CountryDatum, metaData } from '../../../data/data';
import { mapRange } from '../../../tools/math';
import NoData from '../../NoData/NoData';

export interface SkippedMealsWaffleChartProps {
    data: CountryDatum | null;
}

const getLabel = (key: string, value: number) => {
    const formattedValue = value.toFixed(1);

    switch (key) {
        case 'never':
            return `${formattedValue}% never skip a meal.`;
        case 'oncePerWeek':
            return `${formattedValue}% skip a meal once per week.`;
        case 'twoToThreePerWeek':
            return `${formattedValue}% skip a meal two to three times per week.`;
        case 'fourToFivePerWeek':
            return `${formattedValue}% skip a meal four to five times per week.`;
        case 'always':
            return `${formattedValue}% skip a meal everyday.`;
        case 'atLeastOncePerWeek':
        default:
            return `${formattedValue}% skip a meal at least once per week.`;
    }
};

const SkippedMealsWaffleChart = ({ data }: SkippedMealsWaffleChartProps) => {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);

    const { waffleData, subtitle } = useMemo(() => {
        if (data && !data.skippedMeals) return {};

        const skippedMealsData = data ? data.skippedMeals : metaData.averageSkippedMeals;

        const dataOrder = ['never', 'oncePerWeek', 'twoToThreePerWeek', 'fourToFivePerWeek', 'always'] as const;
        const waffleData = dataOrder.map((key, index) => ({
            id: key,
            value: skippedMealsData![key],
            label: getLabel(key, skippedMealsData![key]),
            strength: index === 0 ? 0 : mapRange(index, 1, dataOrder.length - 1, 0, 1),
            color: index === 0 ? 'var(--white)' : 'var(--accent-color)',
        }));

        const activeData = waffleData.find((d) => d.id === activeGroup);

        let subtitle = activeData?.label ?? null;
        if (!subtitle) {
            subtitle = getLabel('atLeastOncePerWeek', skippedMealsData!.atLeastOncePerWeek);
        }

        return { waffleData, subtitle };
    }, [activeGroup, data]);

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <span>Meals skipped per week</span>
                {subtitle && <em className={styles.subtitle}>{subtitle}</em>}
            </div>

            <div className={styles.chartContainer}>
                {!waffleData ? (
                    <NoData />
                ) : (
                    <ChartsWrapper
                        render={(dimensions) => (
                            <WaffleChart
                                {...dimensions}
                                data={waffleData}
                                minSize={24 + 4}
                                onHover={setActiveGroup}
                                highlight={activeGroup}
                            />
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default SkippedMealsWaffleChart;
