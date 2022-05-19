import { AppError } from '../models/appError';

/**
 * Assertion function to check for null or undefined.
 * @param val Value to check.
 */
export function assertNonNull<T>(val: T | null | undefined): asserts val is NonNullable<T> {
  if (val === null || val === undefined) {
    throw new AppError('Value is not supposed to be null or undefined');
  }
}
