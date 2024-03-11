import React from 'react';
import ChartsWrapper from '../../ChartsWrapper/ChartsWrapper';
import Treemap, { TreemapData } from '../Treemap/Treemap';
import { CountryDatum, metaData } from '../../../data/data';
import NoData from '../../NoData/NoData';

export interface AvailableFoodTreemapProps {
    data: CountryDatum[];
}

const AvailableFoodTreemap = ({ data }: AvailableFoodTreemapProps) => {
    const foodMap = {
        fruits: { label: 'Fruits', keys: ['fruits'] },
        vegetables: { label: 'Vegetables', keys: ['vegetables'] },
        grains: { label: 'Grains', keys: ['grains'] },
        beans: { label: 'Beans', keys: ['beans'] },
        nuts: { label: 'Nuts', keys: ['nuts'] },
        meats: { label: 'Meats', keys: ['meats'] },
        seafoods: { label: 'Seafoods', keys: ['seafoods'] },
        dairyAndEggs: { label: 'Dairy and eggs', keys: ['dairyAndEggs'] },
        sugaryDrinks: { label: 'Sugary drinks', keys: ['sugaryDrinks'] },
        tea: { label: 'Tea', keys: ['tea'] },
    };

    const hierarchicalData: TreemapData = { id: 'treemap', label: '', children: [] };

    for (const [foodKey, values] of Object.entries(foodMap)) {
        const datum: TreemapData = {
            id: foodKey,
            label: values.label,
        };

        if (data.length > 1) {
            datum.children = data.map((country) => ({
                id: foodKey + ':' + country.id,
                label: country.countryCode,
                value: values.keys.reduce((acc, key) => acc + ((country.foodInGrams as any)?.[key] || 0), 0),
                title: country.countryName,
            }));
        } else if (data.length === 1) {
            const country = data[0];
            datum.value = values.keys.reduce((acc, key) => acc + ((country.foodInGrams as any)?.[key] || 0), 0);
        } else if (data.length === 0) {
            datum.value = values.keys.reduce((acc, key) => acc + ((metaData.globalAvailableFood as any)[key] || 0), 0);
        }

        hierarchicalData.children?.push(datum);
    }

    if (data.length === 1) {
        const isEmpty = hierarchicalData.children?.every((d) => d.value === 0);

        if (isEmpty) return <NoData />;
    }

    return <ChartsWrapper render={(dimensions) => <Treemap {...dimensions} data={hierarchicalData} />} />;
};

export default AvailableFoodTreemap;
