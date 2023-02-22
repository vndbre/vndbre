import type { Image } from '../image';

/** Vn Screenshot. */
export interface VnScreenshot extends Image {

  /** Thumbnail url. */
  readonly thumbnail: string;

  /** Thumbnail dimensions @see Image dimensions docs. */
  readonly thumbnailDimensions: [number, number];
}
