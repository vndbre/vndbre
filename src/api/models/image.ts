export interface Image {
  readonly id: string;
  readonly url: string;
  readonly dimensions: [number, number];
  readonly sexual: number;
  readonly violence: number;
  readonly voteCount: number;
}
