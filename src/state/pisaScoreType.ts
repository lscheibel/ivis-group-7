import { atom, useAtom } from 'react-atomic-state';
import { PisaScoreType } from '../data/data';

const pisaScoreTypeAtom = atom<PisaScoreType>('average');

export const usePisaScoreType = () => useAtom(pisaScoreTypeAtom);

export const setPisaScoreType = pisaScoreTypeAtom.set;
