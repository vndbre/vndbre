import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { CoverCard } from '../../components/CoverCard/CoverCard';
import { CoverCardSkeleton } from '../../components/CoverCard/CoverCardSkeleton';
import { VisualNovelFormData } from '../../components/VisualNovelSearchForm/VisualNovelSearchForm';

import { VisualNovelPaginationOptions } from '../../../../api/services/visualNovelsService';
import { mapLanguageToSelectOption, mapPlatformToSelectOption } from '../../../../utils/selectOption';

type VisualNovelFormDataOptions = Omit<VisualNovelPaginationOptions, 'page' | 'pageSize'>;

/**
 * Maps visual novel form data to search options.
 * @param formData Form data.
 */
const mapFormDataToOptions = (formData: VisualNovelFormData): VisualNovelFormDataOptions => ({
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
const mapOptionsToFormData = (options: VisualNovelFormDataOptions): Partial<VisualNovelFormData> => ({
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

const PREVIEW_PAGINATION_DEFAULTS: VisualNovelPaginationOptions = {
  page: 1,
  pageSize: 20,
  releasedRange: {
    startDate: new Date('1990'),
    endDate: new Date(),
  },
};

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  const [searchOptions, setSearchOptions] = useState<VisualNovelPaginationOptions>(PREVIEW_PAGINATION_DEFAULTS);
  const { isLoading, data: visualNovelsPage } = useVisualNovelsPageQuery(searchOptions);

  const handlePaginatorChange = useCallback((newPage: number) => {
    setSearchOptions(prev => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    setSearchOptions(prev => ({
      ...prev,
      ...mapFormDataToOptions(data),
      page: 1,
    }));
  }, []);

  const page = useMemo(() => searchOptions.page, [searchOptions.page]);
  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [searchOptions.page, visualNovelsPage?.hasMore]);
  const formDefaultValue = useMemo(() => mapOptionsToFormData(PREVIEW_PAGINATION_DEFAULTS), []);

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
      px={10}
      gap={8}
    >
      <VisualNovelSearchForm
        defaultFormValues={formDefaultValue}
        onSubmit={handleSearchSubmit}
      />

      <Box
        display="grid"
        gridGap={8}
        gridTemplateColumns="repeat(auto-fill, minmax(var(--chakra-sizes-48), 1fr))"
        w="full"
        h="full"
      >
        {isLoading && Array.from({ length: 15 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CoverCardSkeleton key={index} />
        ))}
        {visualNovelsPage?.items.map(vn => (
          <CoverCard
            key={vn.id}
            id={vn.id}
            image={vn.image}
            title={vn.title}
            released={vn.released}
            rating={vn.rating}
            length={vn.length}
            languages={vn.languages}
            platforms={vn.platforms}
          />
        ))}
      </Box>

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
