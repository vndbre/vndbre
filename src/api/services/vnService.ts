import { QueryBuilderService } from './queryBuilderService';
import type { Operator } from '../models/operator';
import type { QueryBody } from '../models/queryBody';
import type { BaseFilter } from '../models/search/baseFilter';
import type { VnFilter, VnQueryOptions, VnSortField } from '../models/search/vnQueryOptions';

/**
 * Creates filter for query.
 * @param field Field.
 * @param operator Operator that applies to field.
 * @param value Value to filter by.
 */
function createFilter<T extends string, O extends Operator>(
  field: T, operator: O, value: string,
): BaseFilter<T, O> {
  return [field, operator, value];
}

export namespace VnService {

  /**
   * Creates vn query.
   * @param options Query options.
   */
  export function createVnQuery(options: VnQueryOptions): QueryBody<VnSortField, VnFilter> {
    const filters: VnFilter[] = [];

    if (options.id !== undefined) {
      filters.push(createFilter('id', '=', options.id));
    }

    if (options.search !== undefined) {
      filters.push(createFilter('search', '=', options.search));
    }

    if (options.languages !== undefined) {
      const langs = options.languages.map<VnFilter>(lang => createFilter('lang', '=', lang));
      filters.push(...langs);
    }

    if (options.originalLanguages !== undefined) {
      const originalLangs = options.originalLanguages.map<VnFilter>(originalLang => createFilter('olang', '=', originalLang));
      filters.push(...originalLangs);
    }

    if (options.platforms !== undefined) {
      const platforms = options.platforms.map<VnFilter>(platform => createFilter('platform', '=', platform));
      filters.push(...platforms);
    }

    if (options.tags !== undefined) {
      const tags = options.tags.map<VnFilter>(tag => createFilter('tag', '=', tag));
      filters.push(...tags);
    }

    if (options.released !== undefined) {
      filters.push(createFilter('released', '>=', options.released.start));
      filters.push(createFilter('released', '<=', options.released.end));
    }

    return {
      ...QueryBuilderService.createBaseQuery(options),
      count: options.page !== undefined,
      fields: 'image.url, title, alttitle',
      filters: ['and', ...filters],
    };
  }
}
