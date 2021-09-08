/**
 * Represents anime related to the VN.
 */
export interface RelatedAnimeDto {

  /**
   * AniDB ID.
   */
  id: number;

  /**
   * AnimeNewsNetwork ID.
   */
  ann_id: number | null;

  /**
   * AnimeNfo ID.
   */
  nfo_id: string | null;

  /**
   * Title in romaji.
   */
  title_romaji: string | null;

  /**
   * Title in kanji.
   */
  title_kanji: string | null;

  /**
   * Year in which the anime was aired.
   */
  year: number | null;

  /**
   * Anime type.
   */
  type: string | null;
}
