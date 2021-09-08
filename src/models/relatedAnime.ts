/**
 * Represents anime related to the VN.
 */
export interface RelatedAnime {

  /**
   * AniDB ID.
   */
  id: number;

  /**
   * AnimeNewsNetwork ID.
   */
  annId: number | null;

  /**
   * AnimeNfo ID.
   */
  nfoId: string | null;

  /**
   * Title in romaji.
   */
  titleRomaji: string | null;

  /**
   * Title in kanji.
   */
  titleKanji: string | null;

  /**
   * Date in which the anime was aired.
   */
  year: Date | null;

  /**
   * Anime type.
   */
  type: string | null;
}
