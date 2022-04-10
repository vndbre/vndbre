import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { CoverCard } from '../../components/CoverCard/CoverCard';
import { CoverCardSkeleton } from '../../components/CoverCard/CoverCardSkeleton';
import { VisualNovelFormData } from '../../components/VisualNovelSearchForm/VisualNovelSearchForm';

// import { VisualNovelPaginationOptions } from '../../../../api/services/visualNovelsService';

// interface VisualNovelSearchParams {
//   readonly page: string;
//   readonly pageSize: string;
//   readonly search: string;
//   readonly startDate: string;
//   readonly endDate: string;
//   readonly platforms: readonly string[];
//   readonly languages: readonly string[];
//   readonly originalLanguages: readonly string[];
// }

// /**
//  *
//  * @param options
//  */
// const mapOptionsToSearchParams = (options: VisualNovelPaginationOptions): VisualNovelSearchParams => ({
//   page: String(options.page),
//   pageSize: String(options.pageSize),
//   search: options.search ?? '',
//   startDate: options.releasedRange?.startDate?.toISOString() ?? '',
//   endDate: options.releasedRange?.endDate?.toISOString() ?? '',
//   platforms: options.platforms ?? [],
//   languages: options.languages ?? [],
//   originalLanguages: options.originalLanguages ?? [],
// });

// const PREVIEW_PAGINATION_DEFAULTS: VisualNovelPaginationOptions = {
//   page: 0,
//   pageSize: 20,
//   search: '',
// };

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  /**
   * TODO: Remove mock data.
   */
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.toString());

  const { isLoading, data: visualNovelsPage } = useVisualNovelsPageQuery({
    page,
    pageSize: 20,
    search: searchQuery,
  });

  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [visualNovelsPage, page]);

  const handlePaginatorChange = useCallback(setPage, []);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    // console.log(data);
    setPage(1);
    setSearchQuery(data.title);
  }, []);

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
      px={10}
      gap={8}
    >
      <VisualNovelSearchForm onSubmit={handleSearchSubmit} />

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
