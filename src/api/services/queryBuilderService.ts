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
  export function createFilter<Field extends string, TOperator extends Operator, Value = unknown>(
    field: Field, operator: TOperator, value: Value,
  ): BaseFilter<Field, TOperator, Value> {
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
