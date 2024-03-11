import React, { useState } from 'react';
import style from './Summary.module.scss';
import { useSelectedCountry } from '../../state/selectedCountry';
import cn from 'classnames';
import { usePisaScoreType, setPisaScoreType, PisaScoreType, pisaScoreTypes } from '../../state/pisaScoreType';
import { fromCamelCaseToUserFormat } from '../../tools/stringsOperators';
import { CountryDatum } from '../../data/data';
import { metaData } from '../../data/data';

export interface SummaryProperties {
    data: { average: number; math: number; reading: number; science: number };
}

const Summary = ({ data }: SummaryProperties) => {
    const selectedCountry = useSelectedCountry();
    const selectedType = usePisaScoreType();
    //const [countryRank, setCountryRank] = useState(); I could not make it work with this hook
    let countryRank = null;

    if (selectedCountry) {
        //setCountryRank(ranking.find((country) => country.countryName === selectedCountry.countryName));
        countryRank = metaData
            .computeRanking(selectedType)
            .find((country) => country.countryName === selectedCountry.countryName);
    }

    return (
        <div className={style.summaryCard}>
            <h1>PISA SCORES</h1>
            <p className={style.subtitle}>
                Latest scores {selectedCountry ? 'for ' + selectedCountry.countryName : 'globally'} <br />
                {countryRank !== null ? '# ' + countryRank?.ranking + ' out of 81' : null} <br />
                {selectedCountry ? 'OECD countries in PISA ranking 2022' : null}
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
