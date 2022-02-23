/**
 * Release type.
 */
export enum ReleaseType {
  Complete = 'complete',
  Partial = 'partial',
  Trial = 'trial',
}

export namespace ReleaseType {

  const TO_READABLE_MAP: Record<ReleaseType, string> = {
    [ReleaseType.Complete]: 'Complete',
    [ReleaseType.Partial]: 'Partial',
    [ReleaseType.Trial]: 'Trial',
  };

  /**
   * Converts a certain release type to readable equivalent.
   * @param value Release type.
   */
  export const toReadable = (value: ReleaseType): string => TO_READABLE_MAP[value];
}
