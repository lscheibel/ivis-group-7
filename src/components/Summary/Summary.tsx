import React from 'react';
import style from './Summary.module.scss';
import { useSelectedCountry } from '../../state/selectedCountry';
import cn from 'classnames';
import { usePisaScoreType, setPisaScoreType, PisaScoreType, pisaScoreTypes } from '../../state/pisaScoreType';
import { fromCamelCaseToUserFormat } from '../../tools/stringsOperators';

export interface SummaryProperties {
    data: { average: number; math: number; reading: number; science: number };
}

const Summary = ({ data }: SummaryProperties) => {
    const selectedCountry = useSelectedCountry();
    const selectedType = usePisaScoreType();

    return (
        <div className={style.summaryCard}>
            <h1>PISA SCORES</h1>
            <p className={style.subtitle}>
                Latest scores {selectedCountry ? 'for ' + selectedCountry.countryName : 'globally'}
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
            <div className={style.radioButtonContainer}>
                <input type="radio" id="" name="" value="" checked={type === selectedType ? true : false} />
            </div>
            <h2>{fromCamelCaseToUserFormat(type)}</h2>
            <p className={style.score}>{Math.round(value)}</p>
        </li>
    );
};

export default Summary;
