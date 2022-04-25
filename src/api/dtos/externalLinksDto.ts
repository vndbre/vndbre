/**
 * External links dto.
 */
export interface ExternalLinksDto {

  /** The URL-encoded tag used on encubed. */
  readonly encubed?: string | null;

  /** The name part of the url on renai.us. */
  readonly renai?: string | null;

  /** Name of the related article on the English Wikipedia. */
  readonly wikipedia?: string | null;

  /** Wikidata identifier. */
  readonly wikidata?: string | null;

  /** Homepage url. */
  readonly homepage?: string | null;

  /** Twitter account name. */
  readonly twitter?: string | null;

  /** AniDB creator id. */
  readonly anidb?: string | null;

  /** Id of pixiv account. */
  readonly pixiv?: string | null;
}
