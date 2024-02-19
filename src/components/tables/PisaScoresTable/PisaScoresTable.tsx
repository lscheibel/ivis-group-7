import { CountryDatum } from '../../../data/data';
import { fromCamelCaseToUserFormat } from '../../../tools/stringsOperators';
import styles from './PisaScoresTable.module.scss';
export interface PisaScoresTableProps {
    data: CountryDatum;
}

const PisaScoresTable = ({ data }: PisaScoresTableProps) => {
    console.log(data.pisaScores);
    const scoresData = Object.entries(data.pisaScores);
    const subjectIcon = ['📊', '🧮', '📚', '🧪'];
    function renderScore([scoreName, scoreValue]: [string, number], index: number) {
        return (
            <tr>
                <td>
                    {subjectIcon[index]} {fromCamelCaseToUserFormat(scoreName)}
                </td>
                <td className={styles.pisaScoreValue}>{scoreValue}</td>
            </tr>
        );
    }

    return (
        <div>
            <h2>PISA Scores</h2>
            <table className={styles.pisaScores}>
                <thead>
                    <tr>
                        <td>Subject</td>
                        <td className={styles.pisaScoreValue}>Score</td>
                    </tr>
                </thead>
                <tbody>{scoresData.map(renderScore)}</tbody>
            </table>
        </div>
    );
};

export default PisaScoresTable;
