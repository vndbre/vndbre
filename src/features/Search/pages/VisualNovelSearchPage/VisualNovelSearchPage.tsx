import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { CoverCard } from '../../components/CoverCard/CoverCard';
import { VisualNovelFormData } from '../../components/VisualNovelSearchForm/VisualNovelSearchForm';
import { ContentWrapper } from '../../../../components';

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  /**
   * TODO: Remove mock data.
   */
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading, error, data: visualNovelsPage } = useVisualNovelsPageQuery({
    page,
    pageSize: 20,
    search: searchQuery,
  });

  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [visualNovelsPage, page]);

  const handlePaginatorChange = useCallback(setPage, []);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    setPage(1);
    setSearchQuery(data.title);
  }, []);

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
      px={10}
    >
      <VisualNovelSearchForm
        onSubmit={handleSearchSubmit}
      />
      <ContentWrapper
        isLoading={isLoading}
        error={error}
      >
        <Box
          display="grid"
          gridGap={4}
          gridTemplateColumns="repeat(auto-fill, minmax(var(--chakra-sizes-48), 1fr))"
          w="full"
          h="full"
        >
          {visualNovelsPage?.items.map(vn => (
            <CoverCard
              key={vn.id}
              id={vn.id}
              image={vn.image ?? undefined}
              title={vn.title}
            />
          ))}
        </Box>
      </ContentWrapper>

      <Box alignSelf="center">
        <Paginator
          isNavigationHidden
          count={pageCount}
          currentPage={page}
          onChange={handlePaginatorChange}
        />
      </Box>
    </Box>
  );
};
