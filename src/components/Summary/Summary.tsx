import React from 'react';
import style from './Summary.module.scss';
import { CountryDatum } from '../../data/data';
import { useSelectedCountry } from '../../state/selectedCountry';
import cn from 'classnames';
import { usePisaScoreType, setPisaScoreType } from '../../state/pisaScoreType';

export interface SummaryProperties {
    data: { average: number; math: number; reading: number; science: number };
}

const Summary = ({ data }: SummaryProperties) => {
    const selectedConutry = useSelectedCountry();
    const selecedType = usePisaScoreType();
    //console.log(selecedType);
    return (
        <div className={style.summaryCard}>
            <h1>PISA SCORES</h1>
            <p>
                <span>Latest scores {selectedConutry ? 'for ' + selectedConutry.countryName : 'globally'}</span>
            </p>
            <ul className={style.summaryGrid}>
                <li
                    onClick={() => setPisaScoreType('average')}
                    className={cn(style.summaryDetail, { [style.active]: selecedType === 'average' })}
                >
                    <h4>Average</h4>
                    <p className={style.score}>{Math.round(data.average)}</p>
                </li>
                <li
                    onClick={() => setPisaScoreType('math')}
                    className={cn(style.summaryDetail, { [style.active]: selecedType === 'math' })}
                >
                    <h4>Math</h4>
                    <p className={style.score}>{Math.round(data.math)}</p>
                </li>
                <li
                    onClick={() => setPisaScoreType('reading')}
                    className={cn(style.summaryDetail, { [style.active]: selecedType === 'reading' })}
                >
                    <h4>Reading</h4>
                    <p className={style.score}>{Math.round(data.reading)}</p>
                </li>
                <li
                    onClick={() => setPisaScoreType('science')}
                    className={cn(style.summaryDetail, { [style.active]: selecedType === 'science' })}
                >
                    <h4>Science</h4>
                    <p className={style.score}>{Math.round(data.science)}</p>
                </li>
            </ul>
        </div>
    );
};

export default Summary;
