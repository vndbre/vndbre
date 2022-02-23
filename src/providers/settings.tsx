import React, { createContext, FC, useContext } from 'react';
import { SpoilerLevel } from '../models/spoilerLevel';
import { TagClassification } from '../models/tagClassification';

interface Settings {

  /**
   * What tags categories to show.
   */
  showTags: Record<TagClassification, boolean>;

  /**
   * Spoiler level for tags.
   */
  spoilerLevel: SpoilerLevel;

  /**
   * Whether nsfw content allowed or not.
   */
  isNsfwContentAllowed: boolean;
}

const defaultSettings: Settings = {
  showTags: {
    [TagClassification.Content]: true,
    [TagClassification.Ero]: true,
    [TagClassification.Technical]: true,
  },
  spoilerLevel: SpoilerLevel.Major,
  isNsfwContentAllowed: false,
};

export const SettingsContext = createContext<Settings>(defaultSettings);

/**
 * Settings Provider.
 */
export const SettingsProvider: FC = ({ children }) => (
  <SettingsContext.Provider value={defaultSettings}>
    {children}
  </SettingsContext.Provider>
);

/**
 * Settings context hook.
 */
export const useSettingsContext = (): Settings => useContext(SettingsContext);
