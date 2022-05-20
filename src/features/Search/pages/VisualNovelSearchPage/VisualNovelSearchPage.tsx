import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { VisualNovelFormData } from './components/VisualNovelSearchForm/VisualNovelSearchForm';
import { VisualNovelList, VisualNovelListVariant } from './components/VisualNovelList/VisualNovelList';
import { VisualNovelListOptions } from './components/VisualNovelListOptions/VisualNovelListOptions';

import { mapLanguageToSelectOption, mapPlatformToSelectOption } from '../../../../utils/selectOption';
import { VisualNovelSearchOptions } from '../../../../api/services/visualNovelsService';
import { useVisualNovelQueryParams } from '../../hooks/useVisualNovelQueryParams';

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
  };
}

/**
 * Maps visual novel search options to form data representation.
 * @param options Options.
 */
function mapOptionsToFormData(options: VisualNovelFormDataSearchOptions): Partial<VisualNovelFormData> {
  return {
    ...(options.search == null ? null : { title: options.search }),
    ...(options.releasedRange == null ? null : {
      releaseYearRange: options.releasedRange.startDate == null || options.releasedRange.endDate == null ?
        undefined :
        [options.releasedRange.startDate.getFullYear(), options.releasedRange.endDate.getFullYear()],
    }),
    ...(options.languages == null ? null : { languages: options.languages.map(mapLanguageToSelectOption) }),
    ...(options.originalLanguages == null ? null : { originalLanguages: options.originalLanguages.map(mapLanguageToSelectOption) }),
    ...(options.platforms == null ? null : { platforms: options.platforms.map(mapPlatformToSelectOption) }),
  };
}

const DEFAULT_PAGINATION_OPTIONS: VisualNovelSearchOptions = {
  page: 1,
  pageSize: 18,
  releasedRange: {
    startDate: new Date('1990'),
    endDate: new Date(),
  },
};

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  const [queryParams, setQueryParams] = useVisualNovelQueryParams();

  const defaultSearchOptions: VisualNovelSearchOptions = useMemo(() => ({
    ...DEFAULT_PAGINATION_OPTIONS,
    ...queryParams,
  }), []);

  const [searchOptions, setSearchOptions] = useState<VisualNovelSearchOptions>(defaultSearchOptions);
  const [tableVariant, setTableVariant] = useState<VisualNovelListVariant>('cards');
  const { isLoading, data: visualNovelsPage } = useVisualNovelsPageQuery(searchOptions);

  const handlePaginatorChange = useCallback((newPage: number) => {
    setSearchOptions(prev => ({
      ...prev,
      page: newPage,
    }));

    setQueryParams({
      ...searchOptions,
      page: newPage,
    });
  }, [searchOptions]);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    const options = mapFormDataToOptions(data);

    setSearchOptions(prev => ({
      ...prev,
      ...options,
      page: 1,
    }));

    setQueryParams({ ...options, page: 1 });
  }, []);

  const page = useMemo(() => searchOptions.page, [searchOptions.page]);
  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [searchOptions.page, visualNovelsPage?.hasMore]);
  const defaultFormValues = useMemo(() => mapOptionsToFormData(defaultSearchOptions), []);

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
        <Box ml="auto">
          <VisualNovelListOptions activeVariant={tableVariant} onVariantChange={setTableVariant} />
        </Box>
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
