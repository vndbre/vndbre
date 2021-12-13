import { Release } from '../../models/release';

/** Country. */
export enum Country {
  Russia = 'ru',
  UnitedKingdom = 'en',
  France = 'fr',
  Italy = 'it',
  Japan = 'ja',
  SouthKorea = 'ko',
  Vietnam = 'vi',
  China = 'zh',
  Spain = 'es',
  Turkey = 'tr',
  Germany = 'de',
  Brazil = 'pt-br',
}

interface CountryInfo {

  /** Country's name. */
  name: string;

  /** Country's language. */
  language: string;
}

export namespace CountryService {

  const COUNTRY_ICON_BASE = 'twemoji:flag-for-flag-';

  const MAP_COUNTRY_INFO: Record<Country, CountryInfo> = {
    [Country.Russia]: { name: 'Russia', language: 'Russian' },
    [Country.UnitedKingdom]: { name: 'United Kingdom', language: 'English' },
    [Country.France]: { name: 'France', language: 'French' },
    [Country.Italy]: { name: 'Italy', language: 'Italian' },
    [Country.Japan]: { name: 'Japan', language: 'Japanese' },
    [Country.SouthKorea]: { name: 'South Korea', language: 'Korean' },
    [Country.Vietnam]: { name: 'Vietnam', language: 'Vietnamese' },
    [Country.China]: { name: 'China', language: 'Chinese' },
    [Country.Spain]: { name: 'Spain', language: 'Spanish' },
    [Country.Turkey]: { name: 'Turkey', language: 'Turkish' },
    [Country.Germany]: { name: 'Germany', language: 'German' },
    [Country.Brazil]: { name: 'Brazil', language: 'Portuguese (Brazil)' },
  };

  /**
   * Converts a certain country to readable equivalent.
   * @param value Country.
   */
  export const toReadable = (value: Country): string => MAP_COUNTRY_INFO[value]?.name ?? '';

  /**
   * Gets language spoken in country.
   * @param value Country.
   */
  export const getLanguage = (value: Country): string => MAP_COUNTRY_INFO[value]?.language ?? '';

  /**
   * Gets name of icon for country.
   * @param value Country.
   */
  export const getCountryIcon = (value: Country): string => COUNTRY_ICON_BASE + toReadable(value)
    .toLowerCase()
    .split(' ')
    .join('-');

  /**
   * Gets all unique countries from releases.
   * @param releases Releases of visual novel.
   */
  export const getCountriesFromReleases = (releases: Release[]): Country[] => Array.from(
    new Set(releases.map(release => release.languages).flat()),
  ) as Country[];
}
