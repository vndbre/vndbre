import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Settings } from 'src/api/models/settings/settings';
import { CookieStorage } from './utils/cookieStorage';

export const SETTINGS_KEY = 'vndbre.display-settings';

export const INITIAL_SETTINGS: Settings = {
  spoilerLevel: 'none',
  hideSexualTags: true,
  imageDisplaySettings: {
    sexualLevel: 'none',
    violenceLevel: 'none',
  },
};

const cookieStorage = { ...CookieStorage.createStorage(), delayInit: true };

export const settingsAtom = atomWithStorage(
  SETTINGS_KEY,
  CookieStorage.getCookieValue(SETTINGS_KEY, INITIAL_SETTINGS),
  cookieStorage,
);

/** Hook for interaction with settings. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSettings = () => useAtom(settingsAtom);
