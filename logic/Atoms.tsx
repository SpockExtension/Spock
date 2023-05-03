import { atomWithStorage } from 'jotai/utils';

export const keyPairsAtom = atomWithStorage('keyPairs', []);
export const keyPairDefaultAtom = atomWithStorage('keyPairDefault', null);
export const passwordAtom = atomWithStorage('password', "admin123");