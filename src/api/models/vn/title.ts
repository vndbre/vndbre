import type { LanguageCode } from '../language';

export interface VnTitle {
  readonly language: LanguageCode;
  readonly title: string;
  readonly titleLatin: string | null;
  readonly isOfficial: boolean;
  readonly isMain: boolean;
}
