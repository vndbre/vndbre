import type { LanguageCode } from '../language';

/** Vn title. */
export interface VnTitle {

  /** Title's language. */
  readonly language: LanguageCode;

  /** Title. */
  readonly title: string;

  /** Latin representation of title. */
  readonly titleLatin: string | null;

  /** Whether title is official. */
  readonly isOfficial: boolean;

  /** Whether the title is used as main. */
  readonly isMain: boolean;
}
