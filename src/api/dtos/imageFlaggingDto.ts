/**
 * Represents image flagging summary.
 */
export interface ImageFlaggingDto {

  /**
   * Number of flagging votes.
   */
  readonly votecount: number;

  /**
   * Sexual score between 0 (safe) and 2 (explicit).
   */
  readonly sexual_avg: number | null;

  /**
   * Violence score between 0 (tame) and 2 (brutal).
   */
  readonly violence_avg: number | null;
}
