import React, { VFC } from 'react';
import { useParams } from 'react-router';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Language, LanguageService } from '../../../../api/services/languageService';
import { Platform, PlatformService } from '../../../../api/services/platformService';
import { Icon } from '../../../../components/Icon/Icon';
import { Release } from '../../../../models/release';
import { useReleasesQuery } from '../../queries';

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
  } = useReleasesQuery(id);

  /**
   * Groups releases by language.
   * @param releases Releases.
   */
  const groupReleases = (releases: Release[]): ReleaseGroups => releases.reduce(
    (accumulatedReleases, currentRelease) => {
      const release = currentRelease.languages.reduce((accumulatedMultiLanguageRelease, currentLanguage) => {
        const languageReleases = accumulatedReleases[currentLanguage] ?
          [...accumulatedReleases[currentLanguage], currentRelease] :
          [currentRelease];
        return { ...accumulatedMultiLanguageRelease, [currentLanguage]: languageReleases };
      }, { } as ReleaseGroups);
      return { ...accumulatedReleases, ...release };
    }, { } as ReleaseGroups,
  );

  if (isReleasesLoading) {
    return <div>Loading...</div>;
  }

  const releasesBlock = releasesData && Object.entries(groupReleases(releasesData)).map(([language, releases]) => (
    <AccordionItem key={language} borderColor="white">
      <h2>
        <AccordionButton>
          <Box display="flex" gridGap={3} textAlign="left" marginRight={3}>
            <Icon name={LanguageService.getLanguageIcon(language as Language)} />
            <Text fontWeight="bold">{LanguageService.toReadable(language as Language)}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {releases.map(release => (
          <Box display="grid" gridGap={5} gridTemplateColumns="120px 2fr 1fr 1fr" key={release.id} marginBottom={1}>
            <Text>{release.releasedISODate}</Text>
            <Text fontWeight="bold">{release.title}</Text>
            <Box display="flex" gridGap={2}>
              {release.ageRating && (
                <Text>
                  {release.ageRating}
                </Text>
              )}
              {release.platforms.map(
                platform => {
                  const suffix = PlatformService.getPlatformIcon(platform as Platform);

                  return (
                    <Tooltip key={platform + String(release.id)} hasArrow label={PlatformService.toReadable(platform as Platform)}>
                      <span><Icon name={suffix} /></span>
                    </Tooltip>
                  );
                },
              )}
            </Box>
            <Text>Test</Text>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {releasesBlock}
    </Accordion>
  );
};
