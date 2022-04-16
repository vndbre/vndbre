import React, { memo, VFC } from 'react';
import { Box, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '../../../../components/Icon/Icon';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { DETAIL_DATA_NULL } from '../../utils/constants';

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
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-end"
                gap={1}
              >
                {vn.languages.map(language => (
                  <Tooltip key={language} label={Language.toReadable(language)}>
                    <span>
                      <Icon name={Language.getLanguageIcon(language)} />
                    </span>
                  </Tooltip>
                ))}
              </Box>
            </Td>
            <Td>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={1}
              >
                {vn.platforms.map(platform => (
                  <Tooltip key={platform} label={Platform.toReadable(platform)}>
                    <span>
                      <Icon name={Platform.getPlatformIcon(platform)} />
                    </span>
                  </Tooltip>
                ))}
              </Box>
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
