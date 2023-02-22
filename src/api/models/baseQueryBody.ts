/** Base query body. */
export interface BaseQueryBody<SortField extends string = string> {

  /** Sort by field. */
  readonly sort?: SortField;

  /** Whether to reverse sort order or not. */
  readonly reverse?: boolean;

  /** Request query page. */
  readonly page?: number;

  /** Number of results to receive(max - 100). */
  readonly results?: number;
}
