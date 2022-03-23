import React, { useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  /**
   * TODO: Remove mock data.
   */
  const [page, setPage] = useState(11);

  return (
    <Box display="flex" flexDir="column" mt={8}>
      <VisualNovelSearchForm />
      <Box alignSelf="center">
        <Paginator
          count={111}
          currentPage={page}
          onChange={setPage}
        />
      </Box>
    </Box>
  );
};
