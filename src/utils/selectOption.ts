import { OptionBase } from 'chakra-react-select';
import { Language } from '../models/language';
import { Platform } from '../models/platform';

/** Option for Chakra UI Select component. */
export interface SelectOption<T = string> extends OptionBase {

  /** Value. */
  readonly value: T;

  /** Readable representation of option value. */
  readonly label: string;

  /** Icon name. */
  readonly icon?: string;
}

/**
 * Makes a select option out of the language.
 * @param language Language.
 */
export function mapLanguageToSelectOption(language: Language): SelectOption<Language> {
  return {
    value: language,
    label: Language.toReadable(language),
    icon: Language.getIcon(language),
  };
}

/**
 * Makes a select option out of the platform.
 * @param platform Platform.
 */
export function mapPlatformToSelectOption(platform: Platform): SelectOption<Platform> {
  return {
    value: platform,
    label: Platform.toReadable(platform),
  };
}
