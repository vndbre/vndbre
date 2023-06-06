import { atom, useAtom } from 'jotai';

export const isMobileAtom = atom(false);

/** Hook for getting current device status(whether it is mobile). */
export const useIsMobile = () => useAtom(isMobileAtom)[0];
