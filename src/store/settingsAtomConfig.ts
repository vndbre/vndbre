import type { Settings } from 'src/api/models/settings/settings';

export const SETTINGS_KEY = 'vndbre.display-settings';

export const INITIAL_SETTINGS: Settings = {
  spoilerLevel: 'none',
  hideSexualTags: true,
  imageDisplaySettings: {
    sexualLevel: 'none',
    violenceLevel: 'none',
  },
};
