import React from 'react';
import style from './Summary.module.scss';
import { useActiveCountry } from '../../state/selectedCountry';
import cn from 'classnames';
import { setPisaScoreType, usePisaScoreType } from '../../state/pisaScoreType';
import { fromCamelCaseToUserFormat } from '../../tools/stringsOperators';
import { metaData, PisaScoreType, pisaScoreTypes } from '../../data/data';

export interface SummaryProperties {
    data: { average: number; math: number; reading: number; science: number };
}

const Summary = ({ data }: SummaryProperties) => {
    const activeCountry = useActiveCountry();
    const selectedType = usePisaScoreType();

    return (
        <div className={style.summaryCard}>
            <h1>PISA SCORES</h1>
            <p className={style.subtitle}>
                {activeCountry
                    ? `${activeCountry.countryName} ranks #${activeCountry?.ranks[selectedType]} in ${selectedType} scores out of ${metaData.totalCountries} OECD countries.`
                    : null}
            </p>
            <ul className={style.summaryGrid}>
                {pisaScoreTypes.map((type) => (
                    <SummaryDetail key={type} selectedType={selectedType} type={type} value={data[type]} />
                ))}
            </ul>
        </div>
    );
};

export interface SummaryDetailProperties {
    type: PisaScoreType;
    value: number;
    selectedType: PisaScoreType;
}

const SummaryDetail = ({ type, value, selectedType }: SummaryDetailProperties) => {
    return (
        <li
            onClick={() => setPisaScoreType(type)}
            className={cn(style.summaryDetail, { [style.active]: type === selectedType })}
        >
            <h2>{fromCamelCaseToUserFormat(type)}</h2>
            <p className={style.score}>{Math.round(value)}</p>
        </li>
    );
};

export default Summary;
