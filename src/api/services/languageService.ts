import { Release } from '../../models/release';

/** Language. */
export enum Language {
  Russian = 'ru',
  English = 'en',
  French = 'fr',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  Vietnamese = 'vi',
  Chinese = 'zh',
  Spanish = 'es',
  Turkish = 'tr',
  German = 'de',
  PortugueseBrazil = 'pt-br',
  Polish = 'pl',
  Hungarian = 'hu',
  Czech = 'cs',
  Ukrainian = 'uk',
}

interface LanguageInfo {

  /** Language's name. */
  name: string;

  /** Language's country (if exists). */
  country: string;
}

export namespace LanguageService {

  const LANGUAGE_ICON_BASE = 'twemoji:flag-for-flag-';

  const MAP_LANGUAGE_INFO: Record<Language, LanguageInfo> = {
    [Language.Russian]: { country: 'Russia', name: 'Russian' },
    [Language.English]: { country: 'United Kingdom', name: 'English' },
    [Language.French]: { country: 'France', name: 'French' },
    [Language.Italian]: { country: 'Italy', name: 'Italian' },
    [Language.Japanese]: { country: 'Japan', name: 'Japanese' },
    [Language.Korean]: { country: 'South Korea', name: 'Korean' },
    [Language.Vietnamese]: { country: 'Vietnam', name: 'Vietnamese' },
    [Language.Chinese]: { country: 'China', name: 'Chinese' },
    [Language.Spanish]: { country: 'Spain', name: 'Spanish' },
    [Language.Turkish]: { country: 'Turkey', name: 'Turkish' },
    [Language.German]: { country: 'Germany', name: 'German' },
    [Language.PortugueseBrazil]: { country: 'Brazil', name: 'Portuguese (Brazil)' },
    [Language.Polish]: { country: 'Poland', name: 'Polish' },
    [Language.Hungarian]: { country: 'Hungary', name: 'Hungarian' },
    [Language.Czech]: { country: 'Czechia', name: 'Czech' },
    [Language.Ukrainian]: { country: 'Ukraine', name: 'Ukrainian' },
  };

  /**
   * Converts a certain language to readable equivalent.
   * @param value Language.
   */
  export const toReadable = (value: Language): string => MAP_LANGUAGE_INFO[value]?.name ?? '';

  /**
   * Gets language's country.
   * @param value Language.
   */
  export const getCountry = (value: Language): string => MAP_LANGUAGE_INFO[value]?.country ?? '';

  /**
   * Gets name of icon for language.
   * @param value Language.
   */
  export const getLanguageIcon = (value: Language): string => LANGUAGE_ICON_BASE + getCountry(value)
    .toLowerCase()
    .split(' ')
    .join('-');

  /**
   * Gets all unique languages from releases.
   * @param releases Releases of visual novel.
   */
  export const getLanguagesFromReleases = (releases: Release[]): Language[] => Array.from(
    new Set(releases.map(release => release.languages).flat()),
  ) as Language[];
}
