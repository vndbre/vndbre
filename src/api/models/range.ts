/** Range. */
export interface Range<T extends string | number> {

  /** Start of range. */
  readonly start: T;

  /** End of range. */
  readonly end: T;
}
