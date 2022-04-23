import React, { memo, ReactNode, VFC } from 'react';
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
import { Icon } from '../Icon/Icon';
import { Release } from '../../models/releases/release';
import { ReleasesService } from '../../api/services/releasesService';
import { ReleaseType } from '../../models/releases/releaseType';
import { Platform } from '../../models/platform';
import { Language } from '../../models/language';

interface ReleaseGroups {
  readonly [language: string]: readonly Release[];
}

interface Props {

  /** List of releases. */
  readonly data: readonly Release[];
}

/** Releases component. */
const ReleasesComponent: VFC<Props> = ({ data }) => {
  /**
   * Groups releases by language.
   * @param releases Releases.
   */
  const groupReleases = (releases: readonly Release[]): ReleaseGroups =>
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
  const getReleaseStatusElement = (releaseType: ReleaseType): ReactNode => {
    const releaseIcon = ReleasesService.getReleaseStatusIcon(releaseType);

    return (
      <Tooltip label={releaseIcon.label}>
        <span>
          <Icon name={releaseIcon.icon} />
        </span>
      </Tooltip>
    );
  };

  const releasesElement = (
    Object.entries(groupReleases(data)) as [Language, Release[]][]
  ).map(([language, releases]) => (
    <AccordionItem key={language}>
      <Heading as="h2">
        <AccordionButton>
          <HStack spacing={3} marginRight={3}>
            <Icon name={Language.getIcon(language)} />
            <Text fontWeight="bold" fontSize="sm">
              {Language.toReadable(language)}
            </Text>
          </HStack>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel>
        {releases.map((release, i) => (
          <Grid
            gap={4}
            templateColumns="120px 2.5fr 1fr 1fr 24px"
            key={String(release.id) + release.releasedDate + String(i)}
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
              {release.platforms.map(platform => (
                <Tooltip
                  key={platform + String(release.id)}
                  label={Platform.toReadable(platform)}
                >
                  <span>
                    <Icon name={Platform.getIcon(platform)} />
                  </span>
                </Tooltip>
              ))}
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
    <Accordion defaultIndex={[0]} allowMultiple paddingBottom={1}>
      {releasesElement}
    </Accordion>
  );
};

export const Releases = memo(ReleasesComponent);
