import React, { VFC } from 'react';
import { Box, Container, Grid, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { ContentWrapper, Error, TagBlock } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { useCharacterQuery } from '../../queries';
import { CharacterRouteParams } from '../../utils/characterRouteParams';
import characterPlaceholder from '../../../../assets/person.svg';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { CharacterGender } from '../../../../models/characters/characterGender';
import { useTraitsQuery } from '../../queries/trait';
import { RootTraitTitle } from '../../../../api/services/traitsService';
import { Trait } from '../../../../models/trait';
import { useSettingsContext } from '../../../../providers';

/** Character page. */
export const CharacterPage: VFC = () => {
  const { isNsfwContentAllowed } = useSettingsContext();
  const { id } = useRouteParams<CharacterRouteParams>();
  const { isLoading, data, error } = useCharacterQuery(Number(id));
  const traitsIds = data?.traits ?? [];
  const { isLoading: isTraitsLoading, data: traits, error: traitsError } = useTraitsQuery(id, traitsIds, {
    enabled: traitsIds.length > 0,
  });

  if (traitsError) {
    return <Error error={traitsError} />;
  }

  /** Groups traits by its root trait. */
  const groupTraits = (): Record<RootTraitTitle, Trait[]> => {
    const groupedTraits: Record<RootTraitTitle, Trait[]> = {
      [RootTraitTitle.Hair]: [],
      [RootTraitTitle.Eyes]: [],
      [RootTraitTitle.Body]: [],
      [RootTraitTitle.Clothes]: [],
      [RootTraitTitle.Items]: [],
      [RootTraitTitle.Personality]: [],
      [RootTraitTitle.Role]: [],
      [RootTraitTitle.EngagesIn]: [],
      [RootTraitTitle.SubjectOf]: [],
      [RootTraitTitle.SubjectOfSexual]: [],
      [RootTraitTitle.EngagesInSexual]: [],
    };
    if (traits) {
      const { traits: childTraits, rootTraits } = traits;
      return rootTraits.reduce((acc, cur) => {
        const isTraitSexual = cur.name === RootTraitTitle.EngagesInSexual || cur.name === RootTraitTitle.SubjectOfSexual;
        if (isTraitSexual && isNsfwContentAllowed === false) {
          return acc;
        }

        const relatedTraits = childTraits.filter(trait => trait.rootId === cur.id);
        return { ...acc, [cur.name]: [...acc[cur.name as RootTraitTitle], ...relatedTraits] };
      }, groupedTraits);
    }
    return groupedTraits;
  };

  return (
    <ContentWrapper isLoading={isLoading || isTraitsLoading} error={error}>
      {data && (
        <Container maxW="1440px">
          <Grid gridTemplateColumns="var(--chakra-sizes-48) 1fr" gap="8" pt="8" mx="auto">
            <Image
              src={data.image ?? undefined}
              fallbackSrc={characterPlaceholder}
              h="auto"
              maxH="80"
              objectFit="cover"
              borderRadius="lg"
            />
            <Box>
              <VStack alignItems="initial" spacing="6">
                <Box>
                  <Heading as="h1" size="md">
                    {data.name}
                  </Heading>
                  <Heading as="h2" size="sm" fontWeight="normal">
                    {data.originalName}
                  </Heading>
                </Box>
                <Box>
                  <VStack alignItems="initial">
                    {data.aliases && (
                      <Text>
                        <Text as="span" fontWeight="bold">
                          Aliases:
                          {' '}
                        </Text>
                        {data.aliases}
                      </Text>
                    )}
                    {data.gender && (
                      <Text>
                        <Text as="span" fontWeight="bold">
                          Gender:
                          {' '}
                        </Text>
                        {CharacterGender.toReadable(data.gender)}
                      </Text>
                    )}
                    <HStack spacing="6">
                      {data.height && (
                        <Text>
                          <Text as="span" fontWeight="bold">
                            Height:
                            {' '}
                          </Text>
                          {data.height}
                          cm
                        </Text>
                      )}
                      {data.weight && (
                        <Text>
                          <Text as="span" fontWeight="bold">
                            Weight:
                            {' '}
                          </Text>
                          {data.weight}
                          kg
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </Box>
                {data.description ? <BBCode text={data.description} /> : <Text>No description.</Text>}
              </VStack>
              <Grid gridTemplateColumns="repeat(3, 1fr)" mt="8" gap="8">
                {traits &&
                  traits.traits.length > 0 &&
                  Object.entries(groupTraits()).map(
                    ([rootTraitTitle, childTraits]) => childTraits.length > 0 && (
                      <TagBlock
                        isExpandable
                        key={rootTraitTitle}
                        title={rootTraitTitle}
                        tags={childTraits.map(trait => ({ name: trait.name }))}
                      />
                    ),
                  )}
              </Grid>
            </Box>
          </Grid>
        </Container>
      )}
    </ContentWrapper>
  );
};
