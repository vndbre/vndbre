import type { flagIconNames } from 'src/components/Icon/Icon';
import type { LanguageCode } from '../models/language';

export namespace LanguageService {

  export const LANGUAGE_ICON_SUFFIX_MAP: Readonly<
    Record<LanguageCode, keyof typeof flagIconNames>
  > = {
    'hi': 'flag-india',
    'zh-Hant': 'flag-china',
    'no': 'flag-norway',
    'da': 'flag-denmark',
    'ro': 'flag-romania',
    'iu': 'flag-canada',
    'eo': 'flag-united-nations',
    'lv': 'flag-latvia',
    'nl': 'flag-netherlands',
    'ru': 'flag-russia',
    'ur': 'flag-pakistan',
    'pt-pt': 'flag-portugal',
    'ms': 'flag-malaysia',
    'sv': 'flag-sweden',
    'sl': 'flag-slovenia',
    'sr': 'flag-serbia',
    'zh-Hans': 'flag-china',
    'ar': 'flag-saudi-arabia',
    'ta': 'flag-sri-lanka',
    'pl': 'flag-poland',
    'vi': 'flag-vietnam',
    'cs': 'flag-czechia',
    'ja': 'flag-japan',
    'de': 'flag-germany',
    'fr': 'flag-france',
    'ck': 'flag-cook-islands',
    'ga': 'flag-ireland',
    'hu': 'flag-hungary',
    'ko': 'flag-south-korea',
    'hr': 'flag-croatia',
    'tr': 'flag-turkey',
    'lt': 'flag-lithuania',
    'fa': 'flag-iran',
    'uk': 'flag-ukraine',
    'la': 'flag-united-nations',
    'bg': 'flag-bulgaria',
    'eu': 'flag-spain',
    'th': 'flag-thailand',
    'he': 'flag-israel',
    'mk': 'flag-north-macedonia',
    'sk': 'flag-slovakia',
    'en': 'flag-united-kingdom',
    'fi': 'flag-finland',
    'es': 'flag-spain',
    'gd': 'flag-scotland',
    'pt-br': 'flag-brazil',
    'ca': 'flag-spain',
    'id': 'flag-indonesia',
    'el': 'flag-greece',
    'it': 'flag-italy',
  } as const;

  /** Readable language map. */
  export const LANGUAGE_READABLE_MAP: Readonly<Record<LanguageCode, string>> = {
    'hi': 'Hindi',
    'zh-Hant': 'Traditional Chinese',
    'no': 'Norwegian',
    'da': 'Danish',
    'ro': 'Romanian',
    'iu': 'Inuktitut',
    'eo': 'Esperanto',
    'lv': 'Latvian',
    'nl': 'Dutch',
    'ru': 'Russian',
    'ur': 'Urdu',
    'pt-pt': 'European Portuguese',
    'ms': 'Malay',
    'sv': 'Swedish',
    'sl': 'Slovenian',
    'sr': 'Serbian',
    'zh-Hans': 'Simplified Chinese',
    'ar': 'Arabic',
    'ta': 'Tamil',
    'pl': 'Polish',
    'vi': 'Vietnamese',
    'cs': 'Czech',
    'ja': 'Japanese',
    'it': 'Italian',
    'de': 'German',
    'fr': 'French',
    'ck': 'ck',
    'ga': 'Irish',
    'hu': 'Hungarian',
    'ko': 'Korean',
    'hr': 'Croatian',
    'tr': 'Turkish',
    'lt': 'Lithuanian',
    'fa': 'Persian',
    'uk': 'Ukrainian',
    'la': 'Latin',
    'bg': 'Bulgarian',
    'eu': 'Basque',
    'th': 'Thai',
    'he': 'Hebrew',
    'mk': 'Macedonian',
    'sk': 'Slovak',
    'en': 'English',
    'fi': 'Finnish',
    'es': 'Spanish',
    'gd': 'Scottish Gaelic',
    'pt-br': 'Brazilian Portuguese',
    'ca': 'Catalan',
    'id': 'Indonesian',
    'el': 'Greek',
  };

  /**
   * Gets readable equivalent of language code.
   * @param languageCode Language code (ISO-639).
   */
  export function toReadable(languageCode: LanguageCode): string {
    return LANGUAGE_READABLE_MAP[languageCode] ?? 'Other language';
  }

  /**
   * Gets flag icon name.
   * @param languageCode Language code (ISO-639).
   */
  export function getLanguageIconName(
    languageCode: LanguageCode,
  ): keyof typeof flagIconNames {
    return LANGUAGE_ICON_SUFFIX_MAP[languageCode] ?? 'white-flag';
  }

}
