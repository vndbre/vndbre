const IMAGE_DISPLAY_LEVEL = {
  none: 0,
  suggestive: 1,
  all: 2,
} as const;

export type ImageDisplayLevel = keyof typeof IMAGE_DISPLAY_LEVEL;

export namespace ImageDisplayLevel {

  /**
   * Gets display level numeric equivalent.
   * @param imageDisplayLevel Spoiler level.
   */
  export function getValue<T extends keyof typeof IMAGE_DISPLAY_LEVEL>(
    imageDisplayLevel: T,
  ): typeof IMAGE_DISPLAY_LEVEL[T] {
    return IMAGE_DISPLAY_LEVEL[imageDisplayLevel];
  }
}
