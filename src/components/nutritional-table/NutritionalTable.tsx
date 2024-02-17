import { CountryDatum } from '../../data/data';

export interface NutriotionalTableProps {
    data: CountryDatum;
}

const NutritionalTable = ({ data }: NutriotionalTableProps) => {
    console.log(data);
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <p>Alcoholic Beverages: {data.availableFood.alcoholicBeverages}</p>
        </div>
    );
};

export default NutritionalTable;
