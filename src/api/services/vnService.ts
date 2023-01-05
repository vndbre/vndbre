import { QueryBuilderService } from './queryBuilderService';
import type { QueryBody } from '../models/queryBody';
import type { VnFilter, VnQueryOptions, VnSortField } from '../models/search/vnQueryOptions';

export namespace VnService {

  /**
   * Creates vn query body.
   * @param options Query options.
   */
  export function createVnQueryBody(options: VnQueryOptions): QueryBody<VnSortField, VnFilter> {
    const filters: VnFilter[] = [];

    if (options.id !== undefined) {
      filters.push(QueryBuilderService.createFilter('id', '=', options.id));
    }

    if (options.search !== undefined) {
      filters.push(QueryBuilderService.createFilter('search', '=', options.search));
    }

    if (options.languages !== undefined) {
      const langs = options.languages.map<VnFilter>(lang => QueryBuilderService.createFilter('lang', '=', lang));
      filters.push(...langs);
    }

    if (options.originalLanguages !== undefined) {
      const originalLangs = options.originalLanguages.map<VnFilter>(originalLang => QueryBuilderService.createFilter('olang', '=', originalLang));
      filters.push(...originalLangs);
    }

    if (options.platforms !== undefined) {
      const platforms = options.platforms.map<VnFilter>(platform => QueryBuilderService.createFilter('platform', '=', platform));
      filters.push(...platforms);
    }

    if (options.tags !== undefined) {
      const tags = options.tags.map<VnFilter>(tag => QueryBuilderService.createFilter('tag', '=', tag));
      filters.push(...tags);
    }

    if (options.released !== undefined) {
      filters.push(QueryBuilderService.createFilter('released', '>=', options.released.start));
      filters.push(QueryBuilderService.createFilter('released', '<=', options.released.end));
    }

    return {
      ...QueryBuilderService.createBaseQueryBody(options),

      // we don't want to receive count without passing a page.
      count: options.page !== undefined,
      fields: 'image.url, title, alttitle',
      filters: ['and', ...filters],
    };
  }
}
