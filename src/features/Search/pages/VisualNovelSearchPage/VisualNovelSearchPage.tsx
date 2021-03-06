import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { VisualNovelFormData } from './components/VisualNovelSearchForm/VisualNovelSearchForm';
import { VisualNovelList, VisualNovelListVariant } from './components/VisualNovelList/VisualNovelList';
import { VisualNovelListOptions } from './components/VisualNovelListOptions/VisualNovelListOptions';

import { VisualNovelSearchOptions, VisualNovelSortField } from '../../../../api/services/visualNovelsService';
import { useVisualNovelQueryParams } from '../../hooks/useVisualNovelQueryParams';
import { Language } from '../../../../models/language';
import { Platform } from '../../../../models/platform';
import { SelectOption } from '../../../../utils/selectOption';
import { Tag } from '../../../../models/tag';
import { Sorting } from '../../../../components';
import { SortOptions, SortType } from '../../../../models/sortOptions';

type VisualNovelFormDataSearchOptions = Omit<VisualNovelSearchOptions, 'page' | 'pageSize'>;

/**
 * Maps visual novel form data to search options.
 * @param formData Form data.
 */
function mapFormDataToOptions(formData: VisualNovelFormData): VisualNovelFormDataSearchOptions {
  return {
    search: formData.title,
    releasedRange: {
      startDate: new Date(String(formData.releaseYearRange[0])),
      endDate: new Date(String(formData.releaseYearRange[1])),
    },
    languages: formData.languages.map(language => language.value),
    originalLanguages: formData.originalLanguages.map(language => language.value),
    platforms: formData.platforms.map(language => language.value),
    tags: formData.tags.map(tag => tag.value),
  };
}

/**
 * Maps visual novel search options to form data representation.
 * @param options Options.
 * @param tags Tags.
 */
function mapOptionsToFormData(
  options: VisualNovelFormDataSearchOptions,
  tags?: readonly SelectOption<Tag['id']>[],
): Partial<VisualNovelFormData> {
  return {
    ...(options.search == null ? null : { title: options.search }),
    ...(options.releasedRange == null ? null : {
      releaseYearRange: options.releasedRange.startDate == null || options.releasedRange.endDate == null ?
        undefined :
        [options.releasedRange.startDate.getFullYear(), options.releasedRange.endDate.getFullYear()],
    }),
    ...(options.languages == null ? null : { languages: options.languages.map(Language.toSelectOption) }),
    ...(options.originalLanguages == null ? null : { originalLanguages: options.originalLanguages.map(Language.toSelectOption) }),
    ...(options.platforms == null ? null : { platforms: options.platforms.map(Platform.toSelectOption) }),
    ...(options.platforms == null ? null : { platforms: options.platforms.map(Platform.toSelectOption) }),
    ...(tags == null ? null : { tags }),
  };
}

const DEFAULT_SEARCH_OPTIONS = {
  page: 1,
  pageSize: 18,
  releasedRange: {
    startDate: new Date('1990'),
    endDate: new Date(),
  },
  sort: {
    type: SortType.Descending,
    field: VisualNovelSortField.Rating,
  },
};

const SORT_OPTION_TO_LABEL_MAP = {
  [VisualNovelSortField.Rating]: 'Rating',
  [VisualNovelSortField.Released]: 'Released Date',
  [VisualNovelSortField.Title]: 'Title',
  [VisualNovelSortField.Popularity]: 'Popularity',
};

const SORT_OPTIONS: readonly SelectOption<VisualNovelSortField>[] = [
  { value: VisualNovelSortField.Rating, label: SORT_OPTION_TO_LABEL_MAP[VisualNovelSortField.Rating] },
  { value: VisualNovelSortField.Released, label: SORT_OPTION_TO_LABEL_MAP[VisualNovelSortField.Released] },
  { value: VisualNovelSortField.Title, label: SORT_OPTION_TO_LABEL_MAP[VisualNovelSortField.Title] },
  { value: VisualNovelSortField.Popularity, label: SORT_OPTION_TO_LABEL_MAP[VisualNovelSortField.Popularity] },
];

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  const [queryParams, setQueryParams] = useVisualNovelQueryParams();
  const defaultSearchOptions = useMemo(() => ({
    ...DEFAULT_SEARCH_OPTIONS,
    ...queryParams,
    tags: queryParams.tagOptions?.map(t => t.value) ?? [],
  }), []);

  const [searchOptions, setSearchOptions] = useState<VisualNovelSearchOptions>(defaultSearchOptions);
  const [tableVariant, setTableVariant] = useState<VisualNovelListVariant>('cards');
  const [selectedTags, setSelectedTags] = useState<readonly SelectOption<Tag['id']>[]>([]);
  const { isLoading, data: visualNovelsPage } = useVisualNovelsPageQuery(searchOptions);

  const handlePaginatorChange = useCallback((newPage: number) => {
    setSearchOptions(prev => ({
      ...prev,
      page: newPage,
    }));

    setQueryParams({
      ...searchOptions,
      tagOptions: selectedTags,
      page: newPage,
    });
  }, [searchOptions, selectedTags]);

  const handleSortingChange = useCallback((newSortOptions: SortOptions<VisualNovelSortField>) => {
    setSearchOptions(prev => ({
      ...prev,
      sort: newSortOptions,
    }));

    setQueryParams({
      ...searchOptions,
      tagOptions: selectedTags,
      sort: newSortOptions,
    });
  }, [searchOptions, selectedTags]);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    const options = mapFormDataToOptions(data);

    setSearchOptions(prev => ({
      ...prev,
      ...options,
      page: 1,
    }));
    setSelectedTags(data.tags);
    setQueryParams({ ...options, sort: searchOptions.sort, tagOptions: data.tags, page: 1 });
  }, [searchOptions]);

  const page = useMemo(() => searchOptions.page, [searchOptions.page]);
  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [searchOptions.page, visualNovelsPage?.hasMore]);
  const defaultFormValues = useMemo(() => mapOptionsToFormData(defaultSearchOptions, queryParams.tagOptions), []);
  const defaultSortValue = useMemo(() => {
    if (defaultSearchOptions.sort != null) {
      return { value: defaultSearchOptions.sort.field, label: SORT_OPTION_TO_LABEL_MAP[defaultSearchOptions.sort.field] };
    }
    return { value: VisualNovelSortField.Rating, label: SORT_OPTION_TO_LABEL_MAP[VisualNovelSortField.Rating] };
  }, [defaultSearchOptions.sort?.field, defaultSearchOptions.sort?.type]);

  return (
    <Box
      display="flex"
      flexDir="column"
      gap={8}
    >
      <Box
        display="flex"
        flexDir="column"
        gap={4}
      >
        <VisualNovelSearchForm
          defaultFormValues={defaultFormValues}
          onSubmit={handleSearchSubmit}
        />

        <HStack ml="auto" gap={4}>
          <Sorting
            defaultSortFieldOption={defaultSortValue}
            defaultDirection={defaultSearchOptions.sort?.type ?? SortType.Descending}
            sortFieldOptions={SORT_OPTIONS}
            onChange={handleSortingChange}
          />

          <VisualNovelListOptions activeVariant={tableVariant} onVariantChange={setTableVariant} />
        </HStack>
      </Box>

      <VisualNovelList
        variant={tableVariant}
        isLoading={isLoading}
        items={visualNovelsPage?.items}
      />

      <Box alignSelf="center">
        <Paginator
          isCountLoading={isLoading}
          isNavigationHidden
          count={pageCount}
          currentPage={page}
          onChange={handlePaginatorChange}
        />
      </Box>
    </Box>
  );
};
