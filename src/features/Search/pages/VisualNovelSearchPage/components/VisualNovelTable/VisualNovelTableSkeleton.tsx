import React, { memo, ReactNode, VFC } from 'react';
import { Skeleton, SkeletonText, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Random } from '../../../../../../utils/random';

/** Visual novel table. */
const VisualNovelTableSkeletonComponent: VFC = () => {
  /**
   * Gets table row.
   * @param key React's key attribute.
   */
  const getRandomRow = (key: number): ReactNode => (
    <Tr key={key} h={10}>
      <Th><SkeletonText w={Random.generateWidthInRange()} noOfLines={1} /></Th>
      <Th><SkeletonText w={Random.generateWidthInRange()} noOfLines={1} ml="auto" /></Th>
      <Th><SkeletonText w={Random.generateWidthInRange()} noOfLines={1} /></Th>
      <Th><SkeletonText w={Random.generateWidthInRange(75)} noOfLines={1} /></Th>
      <Th><SkeletonText w={Random.generateWidthInRange(75)} noOfLines={1} /></Th>
    </Tr>
  );
  return (
    <TableContainer>
      <Table
        size="sm"
        variant="unstyled"
      >
        <Thead>
          <Tr>
            <Th w="25%"><Skeleton h={4} /></Th>
            <Th w="25%"><Skeleton h={4} /></Th>
            <Th w="25%"><Skeleton h={4} /></Th>
            <Th w="7.5%"><Skeleton h={4} /></Th>
            <Th w="7.5%"><Skeleton h={4} /></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 18 }).map((_, index) => getRandomRow(index))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export const VisualNovelTableSkeleton = memo(VisualNovelTableSkeletonComponent);
