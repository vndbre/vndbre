import React, { useMemo, VFC } from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { ContentWrapper } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { Language } from '../../../../models/language';
import { useRelatedVisualNovelsQuery } from '../../../VisualNovel/queries/visualNovel';
import { StaffDetail, StaffLinks, StaffVisualNovels } from '../../components';
import { useStaff } from '../../queries';
import { StaffRouteParams } from '../../utils/staffRouteParams';
import { BBCode } from '../../../../components/BBCode/BBCode';

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
          <VStack alignItems="initial" spacing="8">
            <VStack alignItems="initial" spacing="2">
              <Heading as="h1" size="md">{staff.name}</Heading>
              <Heading as="h2" size="sm" fontWeight="normal">
                {staff.originalName}
              </Heading>
            </VStack>
            <VStack alignItems="initial">
              {staff.language && <StaffDetail title="Language">{Language.toReadable(staff.language)}</StaffDetail>}
              {staff.gender && <StaffDetail title="Gender">{staff.gender}</StaffDetail>}
              {staffAliases.length > 0 && (
                <StaffDetail title="Aliases">
                  {staffAliases}
                </StaffDetail>
              )}
              {staff.links && (
                <StaffDetail title="Links">
                  <StaffLinks links={staff.links} />
                </StaffDetail>
              )}
            </VStack>
            {staff.description ? <BBCode text={staff.description} /> : <Text>No description</Text>}
          </VStack>
          <ContentWrapper isLoading={isVisualNovelsLoading} error={visualNovelsError}>
            {visualNovels && (
              <StaffVisualNovels visualNovels={visualNovels} staffVisualNovels={staff.visualNovels} />
            )}
          </ContentWrapper>
        </Box>
      )}
    </ContentWrapper>
  );
};
