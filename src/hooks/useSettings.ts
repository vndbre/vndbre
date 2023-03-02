import type { Settings } from 'src/api/models/settings/settings';
import { useLocalStorage } from 'usehooks-ts';

const SETTINGS_KEY = 'vndbre:display-settings';

const initialSettings: Settings = {
  spoilerLevel: 'none',
  hideSexualTags: true,
  imageDisplaySettings: {
    sexualLevel: 'none',
    violenceLevel: 'none',
  },
};

/** Hook for managing settings.  */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSettings = () => useLocalStorage(SETTINGS_KEY, initialSettings);
