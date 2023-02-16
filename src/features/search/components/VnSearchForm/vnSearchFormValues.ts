/* eslint-disable jsdoc/require-jsdoc */
import type { MultiValue, SingleValue } from 'react-select';
import type { VnQueryOptions } from 'src/api/models/search/vnQueryOptions';
import type { SortOrder } from 'src/api/models/sortOptions';
import type { SelectOption } from 'src/components/Select';

export interface VnSearchFormValues {
  readonly search: string;
  readonly languages: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly originalLanguage: SingleValue<Omit<SelectOption, 'icon'>>;
  readonly platforms: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly tags: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly length: [number];
  readonly popularity: [number, number];
  readonly released: [number, number];
  readonly rating: [number, number];
  readonly sortDirection: SortOrder;
}

export const vnSearchInitialValues: VnSearchFormValues = {
  search: '',
  languages: [],
  platforms: [],
  tags: [],
  originalLanguage: null,
  length: [5],
  popularity: [0, 100],
  released: [1980, new Date().getFullYear()],
  rating: [10, 100],
  sortDirection: 'desc',
};

export function mapVnSearchFormValuesToQueryOptions(data = vnSearchInitialValues): VnQueryOptions {
  return {
    search: data.search,
    platforms: data.platforms.map(p => p.value),
    languages: data.languages.map(l => l.value),
    originalLanguage: data.originalLanguage?.value,
    tags: data.tags.map(t => t.value),
    popularity: { start: data.popularity[0], end: data.popularity[1] },
    released: { start: data.released[0], end: data.released[1] },
    rating: { start: data.rating[0], end: data.rating[1] },
    sort: {
      field: 'popularity',
      order: data.sortDirection,
    },
  };
}
