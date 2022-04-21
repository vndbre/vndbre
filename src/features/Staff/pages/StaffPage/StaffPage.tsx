import React, { useMemo, VFC } from 'react';
import { Box, VStack, Text, Link, HStack } from '@chakra-ui/react';
import { ContentWrapper, EntityDetail, EntityTitle, HideContent } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { Language } from '../../../../models/language';
import { useRelatedVisualNovelsQuery } from '../../../VisualNovel/queries/visualNovel';
import { StaffVisualNovelsTable } from '../../components';
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

  const description = useMemo(() => {
    if (staff?.description != null) {
      return (
        <HideContent maxHeight={350}>
          <BBCode text={staff.description} />
        </HideContent>
      );
    }
    return <Text>No description</Text>;
  }, [staff?.description]);

  const staffAliases = useMemo(() => {
    if (staff != null) {
      return staff.aliases.reduce<string[]>((acc, cur) => {
        if (cur.originalName) {
          return [...acc, cur.name, cur.originalName];
        }
        return [...acc, cur.name];
      }, []).join(', ');
    }
    return [];
  }, [staff]);

  const links = staff != null ? staff.links.map(link => (
    <Link
      key={link.href}
      href={link.href}
      textTransform="capitalize"
    >
      {link.label}
    </Link>
  )) : [];

  return (
    <ContentWrapper isLoading={isStaffLoading} error={staffError}>
      {staff != null && (
        <Box pt="8">
          <VStack alignItems="initial" spacing="12">
            <VStack alignItems="initial" spacing="8">
              <EntityTitle title={staff.name} originalTitle={staff.originalName} />
              <VStack alignItems="initial">
                {staff.language != null && <EntityDetail title="Language">{Language.toReadable(staff.language)}</EntityDetail>}
                {staff.gender != null && <EntityDetail title="Gender">{Gender.toReadable(staff.gender)}</EntityDetail>}
                {staffAliases.length > 0 && (
                  <EntityDetail title="Aliases">
                    {staffAliases}
                  </EntityDetail>
                )}
                {staff.links != null && (
                  <EntityDetail title="Links">
                    <HStack display="inline">
                      {links}
                    </HStack>
                  </EntityDetail>
                )}
              </VStack>
              {description}
            </VStack>
            <ContentWrapper isLoading={isVisualNovelsLoading} error={visualNovelsError}>
              {visualNovels != null && (
                <StaffVisualNovelsTable visualNovels={visualNovels} staffVisualNovels={staff.visualNovels} />
              )}
            </ContentWrapper>
          </VStack>
        </Box>
      )}
    </ContentWrapper>
  );
};
