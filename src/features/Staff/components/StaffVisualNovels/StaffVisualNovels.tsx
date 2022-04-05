import React, { VFC, memo, useMemo } from 'react';
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

const StaffVisualNovelsComponent: VFC<Props> = ({ visualNovels, staffVisualNovels }) => {
  const groupedVisualNovels = useMemo(() => staffVisualNovels.reduce((acc, cur) => {
    const novel = visualNovels.find(vn => vn.id === cur.id);
    if (novel) {
      return [...acc, { ...novel, ...cur }];
    }
    return acc;
  }, [] as ExtendedVisualNovel[]), [visualNovels, staffVisualNovels]);

  return (
    <>
      {groupedVisualNovels.map(vn => (
        <div>
          {StaffRole.toReadable(vn.role)}
          {' '}
          {vn.note}
          {' '}
          {vn.title}
          {' '}
        </div>
      ))}
    </>
  );
};

export const StaffVisualNovels = memo(StaffVisualNovelsComponent);
