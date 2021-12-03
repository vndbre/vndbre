import React, { createContext, FC, useContext } from 'react';
import { SpoilerLevel } from '../utils/types/spoilerLevel';
import { TagClassification } from '../utils/types/tagClassification';

interface Settings {

  /**
   * What tags categories to show.
   */
  showTags: Record<TagClassification, boolean>;

  /**
   * Amount of spoilers to show.
   * @default {SpoilerLevels.None}
   */
  spoilerLevel: SpoilerLevel;
}

const defaultSettings = {
  showTags: {
    [TagClassification.Content]: true,
    [TagClassification.Ero]: true,
    [TagClassification.Technical]: true,
  },
  spoilerLevel: SpoilerLevel.Major,
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
