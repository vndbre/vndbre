import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { VisualNovelFormData } from './components/VisualNovelSearchForm/VisualNovelSearchForm';
import { VisualNovelList, VisualNovelListVariant } from './components/VisualNovelList/VisualNovelList';
import { VisualNovelListOptions } from './components/VisualNovelListOptions/VisualNovelListOptions';

import { VisualNovelSearchOptions } from '../../../../api/services/visualNovelsService';
import { useVisualNovelQueryParams } from '../../hooks/useVisualNovelQueryParams';
import { Language } from '../../../../models/language';
import { Platform } from '../../../../models/platform';
import { SelectOption } from '../../../../utils/selectOption';
import { Tag } from '../../../../models/tag';

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
    tags: queryParams.tagOptions?.map(t => t.value),
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
  }, [searchOptions]);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    const options = mapFormDataToOptions(data);

    setSearchOptions(prev => ({
      ...prev,
      ...options,
      page: 1,
    }));
    setSelectedTags(data.tags);
    setQueryParams({ ...options, tagOptions: data.tags, page: 1 });
  }, []);

  const page = useMemo(() => searchOptions.page, [searchOptions.page]);
  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [searchOptions.page, visualNovelsPage?.hasMore]);
  const defaultFormValues = useMemo(() => mapOptionsToFormData(defaultSearchOptions, queryParams.tagOptions), []);

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
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
