import { CountryDatum } from '../../data/data';
import { metaData } from '../../data/data';
import styles from './NutritionalTable.module.scss';

export interface NutriotionalTableProps {
    data: CountryDatum;
}

const NutritionalTable = ({ data }: NutriotionalTableProps) => {
    console.log(Object.entries(data.availableFood));
    console.log(metaData.nutrientList);
    const nutritionalData = Object.entries(data.availableFood);
    const averageNutritionalData: Array<[string, number]> = [['', 50]];

    function renderRowNutrient(nutrient: [string, number | null]) {
        const nutrientValue = nutrient[1] || 0;
        const isAdoveAverage =
            nutrientValue === 0 ? '' : nutrientValue >= averageNutritionalData[0][1] ? styles.high : styles.low;
        return (
            <tr>
                <td> {nutrient[0]} </td>

                <td className={`${styles.numberCell} ${isAdoveAverage}`}>
                    {' '}
                    {nutrientValue ? nutrientValue.toFixed(2) : 'No data'}{' '}
                </td>
                <td className={isAdoveAverage}>
                    {' '}
                    {nutrientValue === 0 ? '' : nutrientValue <= averageNutritionalData[0][1] ? '▲' : '▼'}{' '}
                </td>
            </tr>
        );
    }

    return (
        <div>
            <h2>Nutritional Data</h2>
            <p>▲ Above the average / ▼ Bellow the average</p>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {/* <p>Alcoholic Beverages: {data.availableFood.alcoholicBeverages}</p> */}
            <table>{nutritionalData.map(renderRowNutrient)}</table>
        </div>
    );
};

export default NutritionalTable;
