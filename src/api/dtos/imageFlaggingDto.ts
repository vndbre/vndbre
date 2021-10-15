/**
 * Represents image flagging summary.
 */
export interface ImageFlaggingDto {

  /**
   * Number of flagging votes.
   */
  votecount: number;

  /**
   * Sexual score between 0 (safe) and 2 (explicit).
   */
  sexual_avg: number | null;

  /**
   * Violence score between 0 (tame) and 2 (brutal).
   */
  violence_avg: number | null;
}
