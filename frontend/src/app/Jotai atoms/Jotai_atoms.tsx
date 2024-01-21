import { atom } from "jotai";

export const categoryAtom = atom('All'); 

export const openAtom = atom(false);

export const idAtom = atom('');

export const usersImagesAtom = atom<(string[]| undefined)>([]);

