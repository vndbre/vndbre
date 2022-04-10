import React, { memo, VFC } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import { Icon } from '../../../../components/Icon/Icon';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';

interface Props {

  /** Visual novels. */
  readonly items: readonly VisualNovel[];
}

/** Visual novel table. */
const VNTableComponent: VFC<Props> = ({ items }) => (
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
          {/* <Th>Length</Th> */}
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
            <Td>{vn.title}</Td>
            <Td>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-end"
                gap={1}
              >
                {vn.languages.map((language, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Tooltip key={String(vn.id) + language + String(index)} label={Language.toReadable(language)}>
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
                {vn.platforms.map((platform, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Tooltip key={String(vn.id) + platform + String(index)} label={Platform.toReadable(platform)}>
                    <span>
                      <Icon name={Platform.getPlatformIcon(platform)} />
                    </span>
                  </Tooltip>
                ))}
              </Box>
            </Td>
            <Td>{vn.released ? vn.released.getFullYear() : 'Unknown'}</Td>
            <Td>{vn.rating}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export const VNTable = memo(VNTableComponent);
