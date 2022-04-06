import React, { useMemo, VFC } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { ContentWrapper, EntityDetail, EntityTitle } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { Language } from '../../../../models/language';
import { useRelatedVisualNovelsQuery } from '../../../VisualNovel/queries/visualNovel';
import { StaffLinks, StaffVisualNovelsTable } from '../../components';
import { useStaff } from '../../queries';
import { StaffRouteParams } from '../../utils/staffRouteParams';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { Gender } from '../../../../models/gender';

/** Staff page component. */
export const StaffPage: VFC = () => {
  const { id: staffId } = useRouteParams<StaffRouteParams>();
  const { data: staff, isLoading: isStaffLoading, error: staffError } = useStaff(Number(staffId));

  const visualNovelIds = staff?.visualNovels.map(vn => vn.id) ?? [];
  const { data: visualNovels, isLoading: isVisualNovelsLoading, error: visualNovelsError } = useRelatedVisualNovelsQuery(
    Number(staffId), visualNovelIds, {
      enabled: visualNovelIds.length > 0,
    },
  );

  const staffAliases = useMemo(() => {
    if (staff) {
      return staff.aliases.reduce((acc, cur) => {
        if (cur.originalName) {
          return [...acc, cur.name, cur.originalName];
        }
        return [...acc, cur.name];
      }, [] as string[]).join(', ');
    }
    return [];
  }, [staff]);

  return (
    <ContentWrapper isLoading={isStaffLoading} error={staffError}>
      {staff && (
        <Box pt="8">
          <VStack alignItems="initial" spacing="12">
            <VStack alignItems="initial" spacing="8">
              <EntityTitle title={staff.name} originalTitle={staff.originalName} />
              <VStack alignItems="initial">
                {staff.language && <EntityDetail title="Language">{Language.toReadable(staff.language)}</EntityDetail>}
                {staff.gender && <EntityDetail title="Gender">{Gender.toReadable(staff.gender)}</EntityDetail>}
                {staffAliases.length > 0 && (
                  <EntityDetail title="Aliases">
                    {staffAliases}
                  </EntityDetail>
                )}
                {staff.links && (
                  <EntityDetail title="Links">
                    <StaffLinks links={staff.links} />
                  </EntityDetail>
                )}
              </VStack>
              {staff.description ? <BBCode text={staff.description} /> : <Text>No description</Text>}
            </VStack>
            <ContentWrapper isLoading={isVisualNovelsLoading} error={visualNovelsError}>
              {visualNovels && (
                <StaffVisualNovelsTable visualNovels={visualNovels} staffVisualNovels={staff.visualNovels} />
              )}
            </ContentWrapper>
          </VStack>
        </Box>
      )}
    </ContentWrapper>
  );
};
