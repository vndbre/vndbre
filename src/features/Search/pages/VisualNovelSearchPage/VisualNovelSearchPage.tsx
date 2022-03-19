import { Box } from '@chakra-ui/react';
import React, { useState, VFC } from 'react';
import { Paginator } from '../../../../components/Paginator/Paginator';

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  const [page, setPage] = useState(11);

  return (
    <Box display="flex" flexDir="column" mt={8}>
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
