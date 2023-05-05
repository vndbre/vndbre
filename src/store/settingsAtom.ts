'use client';

import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings } from 'src/api/models/settings/settings';
import { SETTINGS_KEY, INITIAL_SETTINGS } from './settingsAtomConfig';
import { CookieStorage } from './utils/cookieStorage';

const cookieStorage = { ...CookieStorage.createStorage<Settings>(), delayInit: true };

export const settingsAtom = atomWithStorage(
  SETTINGS_KEY,
  CookieStorage.getCookieValue(SETTINGS_KEY, INITIAL_SETTINGS),
  cookieStorage,
);

/** Hook for interaction with settings. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSettings = () => useAtom(settingsAtom);
