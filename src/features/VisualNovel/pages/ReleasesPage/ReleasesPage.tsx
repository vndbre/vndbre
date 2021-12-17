import React, { ReactElement, VFC } from 'react';
import { useParams } from 'react-router';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  Language,
  LanguageService,
} from '../../../../api/services/languageService';
import {
  Platform,
  PlatformService,
} from '../../../../api/services/platformService';
import { Icon } from '../../../../components/Icon/Icon';
import { Release } from '../../../../models/release';
import { useReleasesQuery } from '../../queries';
import { ContentWrapper } from '../../../../components';
import { ReleaseType } from '../../../../enums/releaseType';
import { ReleaseService } from '../../../../api/services/releaseService';

interface ReleaseGroups {
  [language: string]: Release[];
}

/**
 * Releases page.
 */
export const ReleasesPage: VFC = () => {
  const { id } = useParams();

  const {
    isLoading: isReleasesLoading,
    data: releasesData,
    error: releasesError,
  } = useReleasesQuery(id);

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
    const releaseIcon = ReleaseService.getReleaseStatusIcon(releaseType);

    return (
      <Tooltip hasArrow label={releaseIcon.label}>
        <span>
          <Icon name={releaseIcon.icon} />
        </span>
      </Tooltip>
    );
  };

  const releasesBlock =
    releasesData &&
    Object.entries(groupReleases(releasesData)).map(([language, releases]) => (
      <AccordionItem key={language} borderColor="transparent">
        <h2>
          <AccordionButton>
            <Box display="flex" gridGap={3} textAlign="left" marginRight={3}>
              <Icon
                name={LanguageService.getLanguageIcon(language as Language)}
              />
              <Text fontWeight="bold">
                {LanguageService.toReadable(language as Language)}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {releases.map(release => (
            <Box
              display="grid"
              gridGap={4}
              gridTemplateColumns="120px 2.5fr 1fr 1fr 25px"
              key={release.id}
              marginBottom={1}
            >
              <Text>{release.releasedISODate}</Text>
              <Box display="flex" gridGap={1}>
                {getReleaseStatusElement(release.type)}
                <Text fontWeight="semibold">{release.title}</Text>
              </Box>
              <Box display="flex" gridGap={2}>
                {release.ageRating && <Text>{release.ageRating}</Text>}
                {release.platforms.map(platform => {
                  const icon = PlatformService.getPlatformIcon(
                    platform as Platform,
                  );

                  return (
                    <Tooltip
                      key={platform + String(release.id)}
                      hasArrow
                      label={PlatformService.toReadable(platform as Platform)}
                    >
                      <span>
                        <Icon name={icon} />
                      </span>
                    </Tooltip>
                  );
                })}
              </Box>
              <Box display="flex" gridGap={2}>
                {ReleaseService.getReleaseIcons(release).map(releaseIcon => (
                  <Tooltip
                    key={releaseIcon.icon + releaseIcon.label}
                    hasArrow
                    label={releaseIcon.label}
                  >
                    <span>
                      <Icon name={releaseIcon.icon} />
                    </span>
                  </Tooltip>
                ))}
              </Box>
              {release.website && (
                <Link
                  variant="no-underline"
                  href={release.website}
                  isExternal
                >
                  <Icon name="ri:external-link-line" />
                </Link>
              )}
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
    ));

  return (
    <ContentWrapper isLoading={isReleasesLoading} error={releasesError}>
      <Accordion defaultIndex={[0]} allowMultiple paddingBottom={1}>
        {releasesBlock}
      </Accordion>
    </ContentWrapper>
  );
};
