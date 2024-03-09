import { atom, useAtom } from 'react-atomic-state';

export type PisaScoreType = 'average' | 'science' | 'math' | 'reading';

export const pisaScoreTypes = ['average', 'science', 'math', 'reading'] as const;

const pisaScoreTypeAtom = atom<PisaScoreType>('average');

export const usePisaScoreType = () => useAtom(pisaScoreTypeAtom);

export const setSelectedCountry = pisaScoreTypeAtom.set;
