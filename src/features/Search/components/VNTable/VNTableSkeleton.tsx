import React, { memo, ReactNode, VFC } from 'react';
import { Skeleton, SkeletonText, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

/** Visual novel table. */
const VNTableSkeletonComponent: VFC = () => {
  /** Get random width. */
  const randomWidth = (min = 25, max = 100): string => `${Math.floor((Math.random() * (max - min)) + min)}%`;

  /** Get table row. */
  const randomRow = (): ReactNode => (
    <Tr h={10}>
      <Th><SkeletonText w={randomWidth()} noOfLines={1} /></Th>
      <Th><SkeletonText w={randomWidth()} noOfLines={1} ml="auto" /></Th>
      <Th><SkeletonText w={randomWidth()} noOfLines={1} /></Th>
      <Th><SkeletonText w={randomWidth(75)} noOfLines={1} /></Th>
      <Th><SkeletonText w={randomWidth(75)} noOfLines={1} /></Th>
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
          {Array.from({ length: 20 }).map(randomRow)}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export const VNTableSkeleton = memo(VNTableSkeletonComponent);
