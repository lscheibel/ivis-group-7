import { CountryDatum } from '../../data/data';
import { metaData } from '../../data/data';
import styles from './NutritionalTable.module.scss';
import { fromCamelCaseToUserFormat } from '../../tools/stringsOperators';

export interface NutriotionalTableProps {
    data: CountryDatum;
}

const NutritionalTable = ({ data }: NutriotionalTableProps) => {
    const nutritionalData = Object.entries(data.availableFood);
    const averageNutritionalData = metaData.averageAvailableFood;

    function renderRowNutrient(nutrient: [string, number | null], index: number) {
        const nutrientValue = nutrient[1] || 0;
        const isAdoveAverage =
            nutrientValue === 0 ? '' : nutrientValue >= averageNutritionalData[index][1] ? styles.high : styles.low;
        return (
            <tr>
                <td> {fromCamelCaseToUserFormat(nutrient[0])} </td>
                <td className={`${styles.numberCell} ${isAdoveAverage}`}>
                    {nutrientValue ? nutrientValue.toFixed(2) : 'No data'}
                </td>
                <td className={isAdoveAverage}>
                    {nutrientValue === 0 ? '' : nutrientValue >= averageNutritionalData[index][1] ? '▲' : '▼'}
                </td>
            </tr>
        );
    }

    return (
        <div>
            <h2>Nutritional Data</h2>
            <p>
                {' '}
                <span className={styles.high}>▲</span> Above the average - <span className={styles.low}>▼</span> Bellow
                the average
            </p>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {/* <p>Alcoholic Beverages: {data.availableFood.alcoholicBeverages}</p> */}
            <table>{nutritionalData.map(renderRowNutrient)}</table>
        </div>
    );
};

export default NutritionalTable;
