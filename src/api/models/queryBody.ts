import type { BaseQueryBody } from './baseQueryBody';
import type { BaseFilter, Operator } from './search/baseFilter';

/** Base query body. */
export interface QueryBody<
  SortField extends string, Filter extends BaseFilter<string, Operator>,
> extends BaseQueryBody<SortField> {

  /** Whether to count items that satisfy given query or not. */
  readonly count: boolean;

  /** List of filters to get data by. */
  readonly filters?: ['and', ...Filter[]];

  /** Fields to retrieve by. */
  readonly fields: string;
}
