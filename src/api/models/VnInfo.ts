/** Visual novel brief info. */
export interface VnInfo {

  /** Romanized title. */
  readonly titleEnglish: string;

  /** Alternative title, typically the same as title but in the original script. */
  readonly titleAlt: string | null;

  /** Image url. */
  readonly imageUrl: string | null;
}
