import { Link, Td, Tr } from '@chakra-ui/react';
import React, { memo, VFC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Language } from '../../../../models/language';
import { Platform } from '../../../../models/platform';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { DETAIL_DATA_NULL } from '../../utils/constants';
import { CardDetailList } from '../CardDetailList/CardDetailList';

interface Props {

  /** Visual novel data. */
  readonly vn: VisualNovel;
}

/** Visual novel table row. */
const VisualNovelTableRowComponent: VFC<Props> = ({ vn }) => (
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
        items={vn.platforms}
        readableMapper={Platform.toReadable}
        iconMapper={Platform.getIcon}
      />
    </Td>
    <Td>{vn.released ? vn.released.getFullYear() : DETAIL_DATA_NULL}</Td>
    <Td>{vn.rating}</Td>
  </Tr>
);

export const VisualNovelTableRow = memo(VisualNovelTableRowComponent);
