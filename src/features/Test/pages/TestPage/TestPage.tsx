import React, { FC } from 'react';
import {
  Stack,
  HStack,
  Button,
  IconButton,
  ButtonGroup,
  Box,
  Link,
  Tag,
  TagLabel,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Icon } from '../../../../components/Icon/Icon';
import { fetchTest } from '../../../../api/services/testService';

/**
 * TODO: add comments.
 */
export const TestPage: FC = () => {
  const { isLoading, error, data } = useQuery('test', () => fetchTest());

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{`An error has occurred: ${(error as Error).message}`}</>;
  }

  return (
    <Stack m="16px" spacing="16px">
      <Heading as="h1" size="lg">Test Page</Heading>
      <Stack spacing={2}>
        <Heading size="md">Fetch test</Heading>
        <div>
          {data?.name}
        </div>
      </Stack>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Heading size="md">Buttons</Heading>
          <HStack>
            <ButtonGroup isAttached colorScheme="orange">
              <Button>Add to list</Button>
              <Box w="6px" h="48px" bg="orange.500">
                <Box borderRadius="4px" w="2px" h="32px" ml="2px" mt="8px" bg="white" opacity="0.75" />
              </Box>
              <IconButton aria-label="Add to list extended" icon={<Icon name="carbon:chevron-down" />} />
            </ButtonGroup>
            <Button>Just button</Button>
            <Button colorScheme="gray">Грей button</Button>
            <Button size="sm" colorScheme="gray">Смол Button</Button>
            <Button size="xs" colorScheme="gray">Тайни Button</Button>
          </HStack>
        </Stack>
        <Stack spacing={2}>
          <Heading size="md">Icon buttons</Heading>
          <HStack>
            <IconButton colorScheme="gray" aria-label="Star" icon={<Icon name="carbon:edit" />} />
            <IconButton colorScheme="gray" size="sm" aria-label="Star" icon={<Icon name="carbon:chevron-down" size="sm" />} />
            <IconButton colorScheme="gray" size="xs" aria-label="Star" icon={<Icon name="carbon:chevron-down" size="xs" />} />
          </HStack>
        </Stack>
        <Stack spacing={2}>
          <Heading size="md">Link</Heading>
          <HStack>
            <Link href="/#">Ссылка</Link>
          </HStack>
        </Stack>

        <Stack spacing={2}>
          <Heading size="md">Tags</Heading>
          <HStack>
            <Tag spacing="24px">
              Просто тег
            </Tag>
            <Tag spacing="24px">
              <TagLabel as={HStack} wordBreak="keep-all">
                <Text fontWeight="medium">Жопный Тег</Text>
                <Text variant="dim">а че</Text>
              </TagLabel>
            </Tag>
            <Button variant="unstyled">
              <Tag spacing="24px">
                тег кнопка
              </Tag>
            </Button>
          </HStack>
        </Stack>

      </Stack>
    </Stack>
  );
};
