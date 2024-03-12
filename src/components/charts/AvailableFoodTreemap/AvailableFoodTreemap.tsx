import React from 'react';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import Treemap, { TreemapData } from '../Treemap/Treemap';
import { CountryDatum, metaData } from '../../../data/data';
import NoData from '../../NoData/NoData';
import lowerCase from 'lodash/lowerCase';
import capitalize from 'lodash/capitalize';

export interface AvailableFoodTreemapProps {
    data: CountryDatum | null;
}

const AvailableFoodTreemap = ({ data }: AvailableFoodTreemapProps) => {
    const foodMap = {
        fruits: { label: 'Fruits', keys: ['fruits'] },
        vegetables: { label: 'Vegetables', keys: ['nonStarchyVegetables', 'potatoes', 'otherStarchyVegetables'] },
        grains: { label: 'Grains', keys: ['refinedGrains', 'wholeGrains'] },
        beans: { label: 'Beans', keys: ['beans'] },
        nuts: { label: 'Nuts', keys: ['nuts'] },
        meats: { label: 'Meats', keys: ['processedMeats', 'unprocessedRedMeats'] },
        seafoods: { label: 'Seafoods', keys: ['seafoods'] },
        dairyAndEggs: { label: 'Dairy and eggs', keys: ['eggs', 'cheese', 'yoghurt'] },
        sugaryDrinks: { label: 'Sugary drinks', keys: ['sugarSweetenedBeverages', 'fruitJuices'] },
        tea: { label: 'Tea', keys: ['tea'] },
    };

    const hierarchicalData: TreemapData = { id: 'treemap', label: '', children: [], valueFormatter: (v) => '' + v };

    for (const [foodKey, values] of Object.entries(foodMap)) {
        const datum: TreemapData = {
            id: foodKey,
            label: values.label,
            valueFormatter: (v) => `${Math.round(v)}g`,
            children: values.keys.map((key) => {
                const dataValue = data
                    ? (data.foodInGrams as any)?.[key]
                    : (metaData.globalAvailableFood as any)[key] / metaData.totalCountries;
                return {
                    id: foodKey + ':' + key,
                    label: capitalize(lowerCase(key)),
                    value: dataValue,
                    valueFormatter: (v) => `${Math.round(v)}g`,
                };
            }),
        };

        hierarchicalData.children?.push(datum);
    }

    if (data && !data?.foodInGrams) {
        return <NoData />;
    }

    return <ChartsWrapper render={(dimensions) => <Treemap {...dimensions} data={hierarchicalData} />} />;
};

export default AvailableFoodTreemap;
