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
} from '@chakra-ui/react';
import { Country, CountryService } from '../../../../api/services/countryService';
import { Icon } from '../../../../components/Icon/Icon';
import { Release } from '../../../../models/release';
import { useReleasesQuery } from '../../queries';
import { DateService } from '../../../../api/services/dateService';

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
   * Groups releases by country.
   * @param releases Releases.
   */
  const groupReleases = (releases: Release[]): { [country: string]: Release[]; } => [...releases].reduce(
    (acc, cur) => {
      const country = cur.languages[0];
      const countryReleases = acc[country] ? [...acc[country], cur] : [cur];
      return { ...acc, [country]: countryReleases };
    }, { } as { [country: string]: Release[]; },
  );

  if (isReleasesLoading) {
    return <div>Loading...</div>;
  }

  const releasesBlock = releasesData && Object.entries(groupReleases(releasesData)).map(([country, releases]) => (
    <AccordionItem key={country} borderColor="white">
      <h2>
        <AccordionButton>
          <Box display="flex" gridGap={3} textAlign="left" marginRight={3}>
            <Icon name={CountryService.getCountryIcon(country as Country)} />
            <Text fontWeight="bold">{CountryService.getLanguage(country as Country)}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {[...releases].sort((a, b) => a.released.getTime() - b.released.getTime()).map(release => (
          <Box display="grid" gridGap={5} gridTemplateColumns="120px 1fr 2fr 1fr" key={release.id} marginBottom={1}>
            <Text>{release.released && DateService.toISODate(release.released)}</Text>
            <Text fontWeight="bold">{release.title}</Text>
            <Text>
              {release.minAge && (`${release.minAge}+`)}
            </Text>
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
