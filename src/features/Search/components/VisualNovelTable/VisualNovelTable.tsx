import React, { memo, VFC } from 'react';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { VisualNovelTableRow } from './VisualNovelTableRow';

interface Props {

  /** Visual novels. */
  readonly items: readonly VisualNovel[];
}

/** Visual novel table. */
const VisualNovelTableComponent: VFC<Props> = ({ items }) => (
  <TableContainer>
    <Table
      size="sm"
      variant="unstyled"
    >
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th textAlign="right">Languages</Th>
          <Th>Platforms</Th>
          <Th>Released</Th>
          <Th>Rating</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map(vn => <VisualNovelTableRow key={vn.id} vn={vn} />)}
      </Tbody>
    </Table>
  </TableContainer>
);

export const VisualNovelTable = memo(VisualNovelTableComponent);
