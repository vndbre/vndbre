import type { BaseQueryBody } from '../models/baseQueryBody';
import type { BaseQueryOptions } from '../models/baseQueryOptions';
import type { BaseFilter, Operator } from '../models/search/baseFilter';

export namespace QueryBuilderService {

  /**
   * Creates filter for query.
   * @param field Field.
   * @param operator Operator that applies to field.
   * @param value Value to filter by.
   */
  export function createFilter<T extends string, O extends Operator>(
    field: T, operator: O, value: string,
  ): BaseFilter<T, O> {
    return [field, operator, value];
  }

  /**
   * Creates base query body.
   * @param options Query options.
   */
  export function createBaseQueryBody<SortField extends string>(
    options: BaseQueryOptions<SortField>,
  ): BaseQueryBody<SortField> {
    return {
      sort: options.sort?.field,
      reverse: options.sort?.order === 'desc',
      page: options.page,
      results: options.results,
    };
  }
}
