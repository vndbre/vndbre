import React, { VFC, memo, useMemo } from 'react';
import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { DateService } from '../../../../api/services/dateService';
import { StaffVisualNovel } from '../../../../models/staff';
import { StaffRole } from '../../../../models/staffRole';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';

interface Props {

  /** List of visual novels that the the staff is involved. */
  readonly visualNovels: readonly VisualNovel[];

  /** List of roles and vn ids the staff involved involved. */
  readonly staffVisualNovels: readonly StaffVisualNovel[];
}

interface ExtendedVisualNovel extends VisualNovel, StaffVisualNovel {}

/** Staff visual novels components. */
const StaffVisualNovelsTableComponent: VFC<Props> = ({ visualNovels, staffVisualNovels }) => {
  const groupedVisualNovels = useMemo(() => staffVisualNovels.reduce<ExtendedVisualNovel[]>((acc, cur) => {
    const novel = visualNovels.find(vn => vn.id === cur.id);
    if (novel) {
      return [...acc, { ...novel, ...cur }];
    }
    return acc;
  }, []), [visualNovels, staffVisualNovels]);

  return (
    <TableContainer>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Released</Th>
            <Th>Roles</Th>
            <Th>Note</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groupedVisualNovels.map(vn => (
            <Tr key={`${vn.id + vn.aliasId}${vn.note}`}>
              <Td whiteSpace="pre-wrap"><Link as={NavLink} to={`/vn/${vn.id}`}>{vn.title}</Link></Td>
              <Td>{vn.released ? DateService.toISODate(vn.released) : 'No info'}</Td>
              <Td>{StaffRole.toReadable(vn.role)}</Td>
              <Td whiteSpace="pre-wrap">{vn.note}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export const StaffVisualNovelsTable = memo(StaffVisualNovelsTableComponent);
