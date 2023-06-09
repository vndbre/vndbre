import type { Settings } from '@/api/models/settings/settings';

export const SETTINGS_KEY = 'vndbre.display-settings';

export const INITIAL_SETTINGS: Settings = {
  spoilerLevel: 'none',
  hideSexualTags: true,
  imageDisplaySettings: {
    sexualLevel: 'none',
    violenceLevel: 'none',
  },
};
