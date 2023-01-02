import type { BaseQueryBody } from './baseQueryBody';
import type { Operator } from './operator';
import type { BaseFilter } from './search/baseFilter';

/** Describes shape of base query options to pass as data. */
export interface QueryBody<
  SortField extends string, Filter extends BaseFilter<string, Operator>,
> extends BaseQueryBody<SortField> {

  /** Number of records that satisfy given query. */
  readonly count: boolean;

  /** List of filters to get data by. */
  readonly filters: ['and', ...Filter[]];

  /** Fields to retrieve by. */
  readonly fields: string;
}
