/**
 * Represents anime related to the VN.
 */
export interface VisualNovelRelatedAnime {

  /**
   * AniDB ID.
   */
  readonly id: number;

  /**
   * AnimeNewsNetwork ID.
   */
  readonly annId: number | null;

  /**
   * AnimeNfo ID.
   */
  readonly nfoId: string | null;

  /**
   * Title in romaji.
   */
  readonly titleRomaji: string | null;

  /**
   * Title in kanji.
   */
  readonly titleKanji: string | null;

  /**
   * Date when the anime was aired.
   */
  readonly year: Date | null;

  /**
   * Anime type.
   */
  readonly type: string | null;
}
