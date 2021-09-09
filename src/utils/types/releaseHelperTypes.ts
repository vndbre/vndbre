/**
 * Release type.
 */
export enum ReleaseType {
  Complete = 'complete',
  Partial = 'partial',
  Trial = 'trial',
}

/**
 * Voiced release status.
 */
export enum ReleaseVoiced {
  NotVoiced = 1,
  EroVoiced,
  PartiallyVoiced,
  FullyVoiced,
}
