import React, { ReactElement, VFC } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  HStack,
  Link,
  Text,
  Tooltip,
  Heading,
} from '@chakra-ui/react';
import { Language } from '../../../../models/language';
import { Icon } from '../../../../components/Icon/Icon';
import { Release } from '../../../../models/releases/release';
import { useReleasesQuery } from '../../queries';
import { ContentWrapper } from '../../../../components';
import { ReleaseType } from '../../../../models/releases/releaseType';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';
import { ReleasesService } from '../../../../api/services/releasesService';
import { Platform } from '../../../../models/platform';

interface ReleaseGroups {
  [language: string]: Release[];
}

/**
 * Releases page.
 */
export const ReleasesPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();

  const {
    isLoading: isReleasesLoading,
    data: releasesData,
    error: releasesError,
  } = useReleasesQuery(Number(id));

  /**
   * Groups releases by language.
   * @param releases Releases.
   */
  const groupReleases = (releases: Release[]): ReleaseGroups =>
    releases.reduce<ReleaseGroups>((accumulatedReleases, currentRelease) => {
      const release = currentRelease.languages.reduce<ReleaseGroups>(
        (accumulatedMultiLanguageRelease, currentLanguage) => {
          const languageReleases = accumulatedReleases[currentLanguage] ?
            [...accumulatedReleases[currentLanguage], currentRelease] :
            [currentRelease];
          return {
            ...accumulatedMultiLanguageRelease,
            [currentLanguage]: languageReleases,
          };
        },
        {},
      );
      return { ...accumulatedReleases, ...release };
    }, {});

  /**
   * Gets element with icon for release status.
   * @param releaseType Release type.
   */
  const getReleaseStatusElement = (releaseType: ReleaseType): ReactElement => {
    const releaseIcon = ReleasesService.getReleaseStatusIcon(releaseType);

    return (
      <Tooltip label={releaseIcon.label}>
        <span>
          <Icon name={releaseIcon.icon} />
        </span>
      </Tooltip>
    );
  };

  const releasesElement =
    releasesData &&
    (
      Object.entries(groupReleases(releasesData)) as [Language, Release[]][]
    ).map(([language, releases]) => (
      <AccordionItem key={language}>
        <Heading as="h2">
          <AccordionButton>
            <HStack spacing={3} marginRight={3}>
              <Icon name={Language.getLanguageIcon(language)} />
              <Text fontWeight="bold" fontSize="sm">
                {Language.toReadable(language)}
              </Text>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel>
          {releases.map(release => (
            <Grid
              gap={4}
              templateColumns="120px 2.5fr 1fr 1fr 24px"
              key={release.id}
              marginBottom={4}
              alignItems="center"
            >
              <Text>{release.releasedDate}</Text>
              <HStack spacing={1}>
                {getReleaseStatusElement(release.type)}
                <Text fontWeight="semibold">{release.title}</Text>
              </HStack>
              <HStack spacing={2}>
                {release.ageRating && <Text>{release.ageRating}</Text>}
                {release.platforms.map(platform => {
                  const icon = Platform.getPlatformIcon(platform);

                  return (
                    <Tooltip
                      key={platform + String(release.id)}
                      label={Platform.toReadable(platform)}
                    >
                      <span>
                        <Icon name={icon} />
                      </span>
                    </Tooltip>
                  );
                })}
              </HStack>
              <HStack spacing={2}>
                {ReleasesService.getReleaseIcons(release).map(releaseIcon => (
                  <Tooltip
                    key={releaseIcon.icon + releaseIcon.label}
                    label={releaseIcon.label}
                  >
                    <span>
                      <Icon name={releaseIcon.icon} />
                    </span>
                  </Tooltip>
                ))}
              </HStack>
              {release.website && (
                <Link variant="no-underline" href={release.website} isExternal>
                  <Icon name="ri:external-link-line" />
                </Link>
              )}
            </Grid>
          ))}
        </AccordionPanel>
      </AccordionItem>
    ));

  return (
    <ContentWrapper isLoading={isReleasesLoading} error={releasesError}>
      <Accordion defaultIndex={[0]} allowMultiple paddingBottom={1}>
        {releasesElement}
      </Accordion>
    </ContentWrapper>
  );
};
