import { atom, useAtom } from 'jotai';

export const isMobileAtom = atom(false);

/** Whether current device is mobile. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useIsMobile = () => useAtom(isMobileAtom)[0];
