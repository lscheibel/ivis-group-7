import { atom, useAtom } from 'react-atomic-state';
import { getDatumById } from '../data/data';

export type CountryId = number;

const selectedCountryAtom = atom<CountryId | null>(null);
const hoveredCountryAtom = atom<CountryId | null>(null);

export const useSelectedCountry = () => {
    const countryId = useAtom(selectedCountryAtom);
    return countryId == null ? null : getDatumById(countryId);
};

export const useHoveredCountry = () => {
    const countryId = useAtom(hoveredCountryAtom);
    return countryId == null ? null : getDatumById(countryId);
};

export const useActiveCountry = () => {
    const selected = useAtom(selectedCountryAtom);
    const hovered = useAtom(hoveredCountryAtom);
    const id = hovered ?? selected;
    return id == null ? null : getDatumById(id);
};

export const setSelectedCountry = selectedCountryAtom.set;
export const setHoveredCountry = hoveredCountryAtom.set;
export const getHoveredCountry = hoveredCountryAtom.get;
