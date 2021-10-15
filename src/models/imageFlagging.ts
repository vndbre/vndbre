/**
 * Represents image flagging summary.
 */
export interface ImageFlagging {

  /**
   * Number of flagging votes.
   */
  voteCount: number;

  /**
   * Sexual score between 0 (safe) and 2 (explicit).
   */
  sexualAvg: number | null;

  /**
   * Violence score between 0 (tame) and 2 (brutal).
   */
  violenceAvg: number | null;
}
