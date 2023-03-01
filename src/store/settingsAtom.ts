import { atom, useAtom } from 'jotai';
import type { Settings } from 'src/api/models/settings/settings';

/**
 *  0 - means hide all images that might contain any suggestive/violent content.
 *  2 - means show all images.
 */

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

export const useSettings = () => useAtom(settingsAtom);
