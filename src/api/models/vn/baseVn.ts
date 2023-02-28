import type { Image } from '../image';

/** Base vn model. */
export interface BaseVn {

  /** Id. */
  readonly id: string;

  /** Title. */
  readonly title: string;

  /** Vn image(poster). */
  readonly image: Image | null;
}
