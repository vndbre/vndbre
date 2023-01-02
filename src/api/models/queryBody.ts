import type { BaseQueryBody } from './baseQueryBody';

/** Describes shape of base query options to pass as data. */
export interface QueryBody<SortField extends string = string> extends BaseQueryBody<SortField> {

  /** Number of records that satisfy given query. */
  readonly count: boolean;

  /** List of filters to get data by. */
  readonly filters: (string | string[])[];

  /** Fields to retrieve by. */
  readonly fields: string;
}
