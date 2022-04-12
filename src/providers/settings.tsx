import React, { createContext, FC, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks';
import { SpoilerLevel } from '../models/spoilerLevel';
import { TagClassification } from '../models/tagClassification';
import {
  KEY_ARE_CONTENT_TAGS_VISIBLE,
  KEY_ARE_ERO_TAGS_VISIBLE,
  KEY_ARE_TECHNICAL_TAGS_VISIBLE,
  KEY_IS_NSFW_CONTENT_VISIBLE,
  KEY_SPOILER_LEVEL,
} from '../utils/localStorageKeys';

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

interface SettingsSetters {

  /** Toggles tags with content classification. */
  toggleTagContent: () => void;

  /** Toggles tags with ero classification. */
  toggleTagEro: () => void;

  /** Toggles tags with technical classification. */
  toggleTagTechnical: () => void;

  /** Sets spoiler level. */
  setSpoilerLevel: (spoilerLevel: SpoilerLevel) => void;

  /** Toggles nsfw content for images(in media). */
  toggleNsfwContent: () => void;
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
  const [isTagContent, setIsTagContent] = useLocalStorage(KEY_ARE_CONTENT_TAGS_VISIBLE, defaultSettings.showTags.cont);
  const [isTagEro, setIsTagEro] = useLocalStorage(KEY_ARE_ERO_TAGS_VISIBLE, defaultSettings.showTags.ero);
  const [isTagTechnical, setIsTagTechnical] = useLocalStorage(KEY_ARE_TECHNICAL_TAGS_VISIBLE, defaultSettings.showTags.tech);
  const [spoilerLevel, setSpoilerLevel] = useLocalStorage(KEY_SPOILER_LEVEL, defaultSettings.spoilerLevel);
  const [
    isNsfwContentAllowed,
    setIsNsfwContentAllowed,
  ] = useLocalStorage(KEY_IS_NSFW_CONTENT_VISIBLE, defaultSettings.isNsfwContentAllowed);

  const settings: Settings & SettingsSetters = useMemo(() => ({
    /** Toggles NSFW content. */
    toggleNsfwContent: () => setIsNsfwContentAllowed(!isNsfwContentAllowed),

    /** Toggles ero tags. */
    toggleTagEro: () => setIsTagEro(!isTagEro),

    /** Toggles content tags. */
    toggleTagContent: () => setIsTagContent(!isTagContent),

    /** Toggles technical tags. */
    toggleTagTechnical: () => setIsTagTechnical(!isTagTechnical),

    /** Sets spoiler level. */
    setSpoilerLevel,
    showTags: {
      [TagClassification.Content]: isTagContent,
      [TagClassification.Ero]: isTagEro,
      [TagClassification.Technical]: isTagTechnical,
    },
    spoilerLevel,
    isNsfwContentAllowed,
  }), [isTagContent, isTagEro, isTagTechnical, isNsfwContentAllowed, spoilerLevel]);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Settings context hook.
 */
export const useSettingsContext = (): Settings & SettingsSetters => useContext(SettingsContext);
