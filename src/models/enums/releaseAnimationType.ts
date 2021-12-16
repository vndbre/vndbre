/**
 * Animation type of release.
 */
export enum ReleaseAnimationType {
  NoAnimation = 1,
  SimpleAnimation,
  SomeFullyAnimated,
  FullyAnimated,
}

export namespace ReleaseAnimationType {

  const TO_READABLE_MAP: Record<ReleaseAnimationType, string> = {
    [ReleaseAnimationType.NoAnimation]: 'No animations',
    [ReleaseAnimationType.SimpleAnimation]: 'Simple animations',
    [ReleaseAnimationType.SomeFullyAnimated]: 'Some fully animated scenes',
    [ReleaseAnimationType.FullyAnimated]: 'All scenes fully animated',
  };

  /**
   * Converts a certain release animation type to readable equivalent.
   * @param value Type of animation of release.
   */
  export function toReadable(value: ReleaseAnimationType): string {
    return TO_READABLE_MAP[value];
  }
}
