import style from './Summary.module.scss';
import { CountryDatum } from '../../data/data';

export interface SummaryProperties {
    data: { average: number; math: number; reading: number; science: number };
}

const Summary = ({ data }: SummaryProperties) => {
    console.log(data);

    return (
        <div className={style.summaryCard}>
            <h1>PISA SCORES</h1>
            <p>
                <span>Latest scores for Italy</span>
            </p>
            <ul className={style.summaryGrid}>
                <li className={style.secondary}>
                    <p>Average</p>
                    <h4>{Math.round(data.average)}</h4>
                </li>
                <li className={style.primary}>
                    <p>Math</p>
                    <h4>{Math.round(data.math)}</h4>
                </li>
                <li className={style.primary}>
                    <p>Reading</p>
                    <h4>{Math.round(data.reading)}</h4>
                </li>
                <li className={style.primary}>
                    <p>Science</p>
                    <h4>{Math.round(data.science)}</h4>
                </li>
            </ul>
        </div>
    );
};

export default Summary;
