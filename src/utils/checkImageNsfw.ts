import { ImageFlagging } from '../models/imageFlagging';

interface Options {

  /** Whether image is nsfw. */
  isImageNsfw?: boolean | null;

  /** Image flagging. */
  imageFlagging?: ImageFlagging | null;
}

// Sexual content rated higher than 0.1 may contain massive boobas.
const MIN_SEXUAL_AVG = 0.1;

// Content under 1 is limited to bandages and small blood stains.
const MIN_VIOLENCE_AVG = 1;

/**
 * Checks if image is nsfw.
 * @param options Options.
 */
export function checkImageNsfw({ isImageNsfw, imageFlagging }: Options): boolean {
  // `isImageNsfw` has highest priority if provided.
  if (isImageNsfw != null && isImageNsfw === true) {
    return true;
  }

  if (
    imageFlagging != null &&
    (imageFlagging.sexualAvg != null && imageFlagging.sexualAvg <= MIN_SEXUAL_AVG) &&
    (imageFlagging.violenceAvg != null && imageFlagging.violenceAvg <= MIN_VIOLENCE_AVG)
  ) {
    return false;
  }
  return true;
}
