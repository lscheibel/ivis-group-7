import React from 'react';
import { CountryDatum } from '../../../data/data';
import ScatterPlot from '../ScatterPlot/ScatterPlot';

export interface ParentalSupportScatterPlotProps {
    width: number;
    height: number;
    data: CountryDatum[];
}

const ParentalSupportScatterPlot = ({ width, height, data }: ParentalSupportScatterPlotProps) => {
    return (
        <ScatterPlot
            width={width}
            height={height}
            data={data}
            axis={{
                x: {
                    label: 'SKIPPED AT LEAST ONE MEAL PER WEEK',
                    getValue: (c) => c.skippedMealAtLeastOnce,
                    from: 0,
                    to: 100,
                },
                y: {
                    label: 'PARENTAL CARE',
                    getValue: (c) => c.parentsFrequentlyAskingAboutDay,
                    from: 0,
                    to: 100,
                },
            }}
        />
    );
};

export default ParentalSupportScatterPlot;
