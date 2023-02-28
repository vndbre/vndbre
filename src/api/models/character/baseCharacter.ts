import type { Image } from '../image';

/** Base character model. */
export interface BaseCharacter {

  /** Id. */
  readonly id: string;

  /** Name. */
  readonly name: string;

  /** Image. */
  readonly image: Image | null;
}
