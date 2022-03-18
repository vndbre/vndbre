import React, { VFC } from 'react';
import { Box, Container, Grid, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { ContentWrapper, Error, TagBlock } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { useCharacterQuery } from '../../queries';
import { CharacterRouteParams } from '../../utils/characterRouteParams';
import characterPlaceholder from '../../../../assets/person.svg';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { CharacterGender } from '../../../../models/characters/characterGender';
import { useExtendedTraitsQuery } from '../../queries/trait';
import { CharacterTraits } from '../../components';
import { useRelatedVisualNovelsQuery } from '../../../VisualNovel/queries/visualNovel';
import { CharacterRole } from '../../../../models/characters/characterRole';

/** Character page. */
export const CharacterPage: VFC = () => {
  const { id } = useRouteParams<CharacterRouteParams>();
  const { isLoading, data, error } = useCharacterQuery(Number(id));

  const traitsIds = data?.traits ?? [];
  const { isLoading: isTraitsLoading, data: traitsWithRoot, error: traitsError } = useExtendedTraitsQuery(id, traitsIds, {
    enabled: traitsIds.length > 0,
  });

  const visualNovelIds = data?.visualNovels.map(vn => vn.visualNovelId) ?? [];
  const {
    isLoading: isVisualNovelsLoading,
    data: visualNovels, error: visualNovelsError,
  } = useRelatedVisualNovelsQuery(Number(id), visualNovelIds, { enabled: visualNovelIds.length > 0 });

  if (traitsError) {
    return <Error error={traitsError} />;
  }

  if (visualNovelsError) {
    return <Error error={visualNovelsError} />;
  }

  const characterInstances = data && data.instances.length > 0 && (
    <TagBlock
      title="Character instances"
      tags={data.instances.map(instance => ({
        name: instance.name,
        note: instance.originalName,
        path: `/character/${instance.id}`,
      }))}
    />
  );

  const relatedVisualNovels = data && data.visualNovels.length > 0 && visualNovels && visualNovels.length > 0 && (
    <TagBlock
      title="Visual novels"
      tags={visualNovels.map(vn => ({
        name: vn.title,
        note: CharacterRole.toReadable(
          data.visualNovels.find(characterVn => characterVn.visualNovelId === vn.id)?.role ?? CharacterRole.Appears,
        ),
        path: `/vn/${vn.id}`,
      }))}
    />
  );

  return (
    <ContentWrapper isLoading={isLoading || isTraitsLoading || isVisualNovelsLoading} error={error}>
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
            </Box>
          </Grid>
          <Grid gridTemplateColumns="repeat(3, 1fr)" mt="8" gap="8">
            {traitsWithRoot && <CharacterTraits traits={traitsWithRoot} />}
            {characterInstances}
            {relatedVisualNovels}
          </Grid>
        </Container>
      )}
    </ContentWrapper>
  );
};
