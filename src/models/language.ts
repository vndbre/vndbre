import { enumToArray } from '../utils/enumToArray';

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
  Catalan = 'ca',
  Arabic = 'ar',
  Bulgarian = 'bg',
  Swedish = 'sv',
  Finnish = 'fi',
  Romanian = 'ro',
  Tagalog = 'ta',
  Macedonian = 'mk',
  Slovene = 'sl',
  Hebrew = 'he',
  Indonesian = 'id',
  Danish = 'da',
  Latvian = 'lv',
  Lithuanian = 'lt',
  Dutch = 'nl',
  Esperanto = 'eo',
  Greek = 'el',
  Hindi = 'hi',
  Thai = 'th',
  Urdu = 'ur',
  Persian = 'fa',
  Irish = 'ga',
  Latin = 'la',
  Portuguese = 'pt-pt',
  Malay = 'ms',
  Norwegian = 'no',
  Slovak = 'sk',
  ScottishGaelic = 'gd',
  OtherLanguage = 'other',
}

interface LanguageInfo {

  /** Language's name. */
  readonly name: string;

  /** Suffix for language icon. */
  readonly iconSuffix?: string;
}

export namespace Language {

  const DEFAULT_LANGUAGE_ICON = 'noto:white-flag';
  const LANGUAGE_ICON_BASE = 'twemoji:flag-for-flag-';

  const TO_LANGUAGE_INFO_MAP: Readonly<Record<Language, LanguageInfo>> = {
    [Language.Russian]: { name: 'Russian', iconSuffix: 'russia' },
    [Language.English]: { name: 'English', iconSuffix: 'united-kingdom' },
    [Language.French]: { name: 'French', iconSuffix: 'france' },
    [Language.Italian]: { name: 'Italian', iconSuffix: 'italy' },
    [Language.Japanese]: { name: 'Japanese', iconSuffix: 'japan' },
    [Language.Korean]: { name: 'Korean', iconSuffix: 'south-korea' },
    [Language.Vietnamese]: { name: 'Vietnamese', iconSuffix: 'vietnam' },
    [Language.Chinese]: { name: 'Chinese', iconSuffix: 'china' },
    [Language.Spanish]: { name: 'Spanish', iconSuffix: 'spain' },
    [Language.Turkish]: { name: 'Turkish', iconSuffix: 'turkey' },
    [Language.German]: { name: 'German', iconSuffix: 'germany' },
    [Language.PortugueseBrazil]: { name: 'Portuguese (Brazil)', iconSuffix: 'brazil' },
    [Language.Polish]: { name: 'Polish', iconSuffix: 'poland' },
    [Language.Hungarian]: { name: 'Hungarian', iconSuffix: 'hungary' },
    [Language.Czech]: { name: 'Czech', iconSuffix: 'czechia' },
    [Language.Ukrainian]: { name: 'Ukrainian', iconSuffix: 'ukraine' },
    [Language.Catalan]: { name: 'Catalan' },
    [Language.Arabic]: { name: 'Arabic' },
    [Language.Bulgarian]: { name: 'Bulgarian', iconSuffix: 'bulgaria' },
    [Language.Swedish]: { name: 'Swedish', iconSuffix: 'sweden' },
    [Language.Finnish]: { name: 'Finnish', iconSuffix: 'finland' },
    [Language.Romanian]: { name: 'Romanian', iconSuffix: 'romania' },
    [Language.Tagalog]: { name: 'Tagalog', iconSuffix: 'philippines' },
    [Language.Macedonian]: { name: 'Macedonian', iconSuffix: 'north-macedonia' },
    [Language.Slovene]: { name: 'Slovene', iconSuffix: 'slovenia' },
    [Language.Hebrew]: { name: 'Hebrew', iconSuffix: 'israel' },
    [Language.Indonesian]: { name: 'Indonesian', iconSuffix: 'indonesia' },
    [Language.Danish]: { name: 'Danish', iconSuffix: 'denmark' },
    [Language.Latvian]: { name: 'Latvian', iconSuffix: 'latvia' },
    [Language.Lithuanian]: { name: 'Lithuanian', iconSuffix: 'lithuania' },
    [Language.Dutch]: { name: 'Dutch', iconSuffix: 'netherlands' },
    [Language.Esperanto]: { name: 'Esperanto' },
    [Language.Greek]: { name: 'Greek', iconSuffix: 'greece' },
    [Language.Hindi]: { name: 'Hindi', iconSuffix: 'india' },
    [Language.Thai]: { name: 'Thai', iconSuffix: 'thailand' },
    [Language.Urdu]: { name: 'Urdu', iconSuffix: 'pakistan' },
    [Language.Persian]: { name: 'Persian' },
    [Language.Irish]: { name: 'Irish', iconSuffix: 'ireland' },
    [Language.Latin]: { name: 'Latin' },
    [Language.Portuguese]: { name: 'Portuguese (Portugal)', iconSuffix: 'portugal' },
    [Language.Malay]: { name: 'Malay', iconSuffix: 'malaysia' },
    [Language.Norwegian]: { name: 'Norwegian', iconSuffix: 'norway' },
    [Language.Slovak]: { name: 'Slovak', iconSuffix: 'slovakia' },
    [Language.ScottishGaelic]: { name: 'Scottish Gaelic' },
    [Language.OtherLanguage]: { name: 'Other language' },
  };

  /**
   * Converts a certain language to readable equivalent.
   * @param value Language.
   */
  export function toReadable(value: Language): string {
    return TO_LANGUAGE_INFO_MAP[value].name;
  }

  /**
   * Convert string value to value of Language type.
   * @param value Value.
   */
  export function toLanguage(value: string): Language {
    const language = value as Language;
    return TO_LANGUAGE_INFO_MAP[language] ? language : Language.OtherLanguage;
  }

  /**
   * Gets name of icon for language.
   * @param value Language.
   */
  export function getLanguageIcon(value: Language): string {
    const suffix = TO_LANGUAGE_INFO_MAP[value]?.iconSuffix;

    if (suffix) {
      return LANGUAGE_ICON_BASE + suffix;
    }

    return DEFAULT_LANGUAGE_ICON;
  }

  /** Obtains alphabetically sorted languages. */
  export function getSortedLanguages(): Language[] {
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    return enumToArray(Language).sort();
  }
}
