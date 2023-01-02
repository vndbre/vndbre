import type { BaseQueryBody } from '../models/baseQueryBody';
import type { BaseQueryOptions } from '../models/baseQueryOptions';

export namespace QueryBuilderService {

  /**
   * Creates base query body.
   * @param options Query options.
   */
  export function createBaseQuery<SortField extends string>(
    options: BaseQueryOptions<SortField>,
  ): BaseQueryBody<SortField> {
    return {
      sort: options.sort?.field,
      reverse: options.sort?.order === 'desc',
      page: options.page,
    };
  }
}
