import { atom, useAtom } from 'react-atomic-state';

export type CountryTLD = string;

const selectedCountryAtom = atom<CountryTLD | null>(null);

export const useSelectedCountry = () => useAtom(selectedCountryAtom);
export const setSelectedCountry = selectedCountryAtom.set;
