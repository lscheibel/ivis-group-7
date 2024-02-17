import { atom, useAtom } from 'react-atomic-state';
import { CountryDatum, data } from '../data/data';

export type CountryIndex = number;
//CountryDatum;
//?Works for static Data

const selectedCountryAtom = atom<CountryIndex | null>(14); // atom<type | type>(initialValue)

//? Custom Hook
export const useSelectedCountry = () => {
    const countyIndex = useAtom(selectedCountryAtom);

    if (countyIndex == null) return null;

    return data[countyIndex];
};

export const setSelectedCountry = selectedCountryAtom.set;
