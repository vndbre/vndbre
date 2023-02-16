/** Image. */
export interface Image {

  /** Image id. */
  readonly id: string;

  /** Image url. */
  readonly url: string;

  /** Image dimensions [width, height]. */
  readonly dimensions: [number, number];

  /** Number between 0 and 2 (inclusive), average image flagging vote for sexual content. */
  readonly sexual: number;

  /** Number between 0 and 2 (inclusive), average image flagging vote for violence. */
  readonly violence: number;

  /** Number of image flagging votes. */
  readonly voteCount: number;
}
