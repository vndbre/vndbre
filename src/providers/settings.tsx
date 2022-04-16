import React, { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';
import { SpoilerLevel } from '../models/spoilerLevel';
import { TagClassification } from '../models/tagClassification';
import { KEY_VIEW_SETTINGS } from '../utils/localStorageKeys';

interface Settings {

  /**
   * What tags categories to show.
   */
  readonly showTags: Record<TagClassification, boolean>;

  /**
   * Spoiler level for tags.
   */
  readonly spoilerLevel: SpoilerLevel;

  /**
   * Whether nsfw content allowed or not.
   */
  readonly isNsfwContentAllowed: boolean;
}

interface SettingsSetters {

  /** Updates settings. */
  readonly updateSettings: (newSettings: Settings) => void;
}

const defaultSettings: Settings = {
  showTags: {
    [TagClassification.Content]: true,
    [TagClassification.Ero]: false,
    [TagClassification.Technical]: true,
  },
  spoilerLevel: SpoilerLevel.Major,
  isNsfwContentAllowed: false,
};

export const SettingsContext = createContext<Settings & SettingsSetters>({} as Settings & SettingsSetters);

/**
 * Settings Provider.
 */
export const SettingsProvider: FC = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
  }, []);

  const value: Settings & SettingsSetters = useMemo(() => ({
    updateSettings,
    showTags: settings.showTags,
    spoilerLevel: settings.spoilerLevel,
    isNsfwContentAllowed: settings.isNsfwContentAllowed,
  }), [settings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Settings context hook.
 */
export const useSettingsContext = (): Settings & SettingsSetters => useContext(SettingsContext);
