import { atom, useAtom } from 'jotai';
import type { Settings } from 'src/api/models/settings/settings';

const initialSettings: Settings = {
  spoilerLevel: 'none',
  hideSexualTags: true,
  imageDisplaySettings: {
    sexualLevel: 'none',
    violenceLevel: 'none',
  },
};

const _settingsAtom = atom(initialSettings);

export const settingsAtom = atom(
  get => get(_settingsAtom),
  (_get, set, newSettings: Settings) => set(_settingsAtom, newSettings),
);

/** Hook for retrieving settings. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSettings = () => useAtom(settingsAtom);
