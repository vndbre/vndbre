import React, { memo, VFC } from 'react';
import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { DETAIL_DATA_NULL } from '../../utils/constants';
import { CardDetailList } from '../CardDetailList/CardDetailList';

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
        {items.map(vn => (
          <Tr
            key={vn.id}
            _hover={{
              backgroundColor: 'gray.100',
            }}
          >
            <Td>
              <Link
                as={RouterLink}
                variant="no-underline"
                to={`/vn/${vn.id}`}
                whiteSpace="break-spaces"
              >
                {vn.title}
              </Link>
            </Td>
            <Td>
              <CardDetailList
                alignment="end"
                items={vn.languages}
                readableMapper={Language.toReadable}
                iconMapper={Language.getIcon}
              />

            </Td>
            <Td>
              <CardDetailList
                title="Platforms"
                items={vn.platforms}
                readableMapper={Platform.toReadable}
                iconMapper={Platform.getIcon}
              />
            </Td>
            <Td>{vn.released ? vn.released.getFullYear() : DETAIL_DATA_NULL}</Td>
            <Td>{vn.rating}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export const VisualNovelTable = memo(VisualNovelTableComponent);
