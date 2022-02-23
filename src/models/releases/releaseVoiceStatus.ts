/**
 * Voice status of release.
 */
export enum ReleaseVoiceStatus {
  NotVoiced = 1,
  EroVoiced,
  PartiallyVoiced,
  FullyVoiced,
}

export namespace ReleaseVoiceStatus {

  const TO_READABLE_MAP: Record<ReleaseVoiceStatus, string> = {
    [ReleaseVoiceStatus.NotVoiced]: 'Not voiced',
    [ReleaseVoiceStatus.EroVoiced]: 'Only ero scenes voiced',
    [ReleaseVoiceStatus.PartiallyVoiced]: 'Partially voiced',
    [ReleaseVoiceStatus.FullyVoiced]: 'Fully voiced',
  };

  /**
   * Converts a certain voice status of release type to readable equivalent.
   * @param value Voice status of release.
   */
  export const toReadable = (value: ReleaseVoiceStatus): string => TO_READABLE_MAP[value];
}
