import React, { FC } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchFullVisualNovel } from '../../../../api/services/visualNovelService';

/**
 * TODO: add comments.
 */
export const TestPage: FC = () => {
  const { isLoading, error, data } = useQuery('test', () => fetchFullVisualNovel('92'));

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{`An error has occurred: ${(error as Error).message}`}</>;
  }

  return (
    <div>
      TEST PAGE
      <div>
        {data?.title}
      </div>
      <Stack direction="row" spacing={4} align="center">
        <Button colorScheme="telegram" variant="solid">
          Button
        </Button>
        <Button colorScheme="teal" variant="outline">
          Button
        </Button>
        <Button colorScheme="teal" variant="ghost">
          Button
        </Button>
        <Button colorScheme="teal" variant="link">
          Button
        </Button>
      </Stack>
    </div>
  );
};
