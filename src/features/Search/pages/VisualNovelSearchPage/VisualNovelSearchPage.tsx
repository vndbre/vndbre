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
import { useVisualNovelQueryParams } from './hooks/useQueryParams';

type VisualNovelFormDataSearchOptions = Omit<VisualNovelSearchOptions, 'page' | 'pageSize'>;

/**
 * Maps visual novel form data to search options.
 * @param formData Form data.
 */
const mapFormDataToOptions = (formData: VisualNovelFormData): VisualNovelFormDataSearchOptions => ({
  search: formData.title,
  releasedRange: {
    startDate: new Date(String(formData.releaseYearRange[0])),
    endDate: new Date(String(formData.releaseYearRange[1])),
  },
  languages: formData.languages.map(language => language.value),
  originalLanguages: formData.originalLanguages.map(language => language.value),
  platforms: formData.platforms.map(language => language.value),
});

/**
 * Maps visual novel search options to form data representation.
 * @param options Options.
 */
const mapOptionsToFormData = (options: VisualNovelFormDataSearchOptions): Partial<VisualNovelFormData> => ({
  ...(options.search == null ? null : { title: options.search }),
  ...(options.releasedRange == null ? null : {
    releaseYearRange: options.releasedRange.startDate == null || options.releasedRange.endDate == null ?
      undefined :
      [options.releasedRange.startDate.getFullYear(), options.releasedRange.endDate.getFullYear()],
  }),
  ...(options.languages == null ? null : { languages: options.languages.map(mapLanguageToSelectOption) }),
  ...(options.originalLanguages == null ? null : { originalLanguages: options.originalLanguages.map(mapLanguageToSelectOption) }),
  ...(options.platforms == null ? null : { platforms: options.platforms.map(mapPlatformToSelectOption) }),
});

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
  const [query, setQuery] = useVisualNovelQueryParams();

  const defaultSearchOptions: VisualNovelSearchOptions = {
    ...DEFAULT_PAGINATION_OPTIONS,
    ...query,
  };

  const [searchOptions, setSearchOptions] = useState<VisualNovelSearchOptions>(defaultSearchOptions);
  const { isLoading, data: visualNovelsPage } = useVisualNovelsPageQuery(searchOptions);

  const handlePaginatorChange = useCallback((newPage: number) => {
    setSearchOptions(prev => ({
      ...prev,
      page: newPage,
    }));

    setQuery(prev => ({
      ...prev,
      page: newPage,
    }));
  }, [searchOptions]);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    const options = mapFormDataToOptions(data);

    setSearchOptions(prev => ({
      ...prev,
      ...options,
      page: 1,
    }));

    setQuery({ ...options, page: 1 });
  }, []);

  const page = useMemo(() => searchOptions.page, [searchOptions.page]);
  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [searchOptions.page, visualNovelsPage?.hasMore]);
  const defaultFormValues = useMemo(() => mapOptionsToFormData(defaultSearchOptions), []);
  const [tableVariant, setTableVariant] = useState<VisualNovelListVariant>('cards');

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
      px={10}
      gap={8}
    >
      <VisualNovelSearchForm
        defaultFormValues={defaultFormValues}
        onSubmit={handleSearchSubmit}
      />

      <VisualNovelListOptions activeVariant={tableVariant} onVariantChange={setTableVariant} />

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
