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

/**
 * Animation type.
 */
export enum ReleaseAnimationType {
  NoAnimation = 1,
  SimpleAnimation,
  SomeFullyAnimated,
  FullyAnimated,
}
