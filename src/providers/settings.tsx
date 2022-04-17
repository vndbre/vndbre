import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LocalStorageService } from '../api/services/localStorageService';
import { SpoilerLevel } from '../models/spoilerLevel';
import { TagClassification } from '../models/tagClassification';
import { KEY_VIEW_SETTINGS } from '../utils/localStorageKeys';

interface Settings {

  /**
   * What tags categories to show.
   */
  readonly tagsVisibility: Readonly<Record<TagClassification, boolean>>;

  /**
   * Spoiler level for content.
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
  tagsVisibility: {
    [TagClassification.Content]: true,
    [TagClassification.Ero]: false,
    [TagClassification.Technical]: true,
  },
  spoilerLevel: SpoilerLevel.None,
  isNsfwContentAllowed: false,
};

export const SettingsContext = createContext<Settings & SettingsSetters>({} as Settings & SettingsSetters);

/**
 * Settings Provider.
 */
export const SettingsProvider: FC = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const data = LocalStorageService.get<Settings>(KEY_VIEW_SETTINGS);
    if (data !== null) {
      setSettings(data);
    }
  }, []);

  /** Updates application view settings. */
  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
    LocalStorageService.save(KEY_VIEW_SETTINGS, newSettings);
  }, []);

  const value: Settings & SettingsSetters = useMemo(() => ({
    updateSettings,
    tagsVisibility: settings.tagsVisibility,
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
