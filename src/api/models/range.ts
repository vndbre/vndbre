export interface Range<T extends string | number> {
  readonly start: T;
  readonly end: T;
}
