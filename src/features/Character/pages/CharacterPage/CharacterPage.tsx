import React, { VFC } from 'react';
import { Box, Grid, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { ContentWrapper, Error, TagList } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { useCharacterQuery } from '../../queries';
import { CharacterRouteParams } from '../../utils/characterRouteParams';
import characterPlaceholder from '../../../../assets/person.svg';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { CharacterGender } from '../../../../models/characters/characterGender';
import { useExtendedTraitsQuery } from '../../queries/trait';
import { CharacterDetail, CharacterTraits } from '../../components';
import { useRelatedVisualNovelsQuery } from '../../../VisualNovel/queries/visualNovel';
import { CharacterRole } from '../../../../models/characters/characterRole';

/** Character page. */
export const CharacterPage: VFC = () => {
  const { id } = useRouteParams<CharacterRouteParams>();
  const {
    isLoading: isCharacterLoading,
    data: character,
    error: characterError,
  } = useCharacterQuery(Number(id));

  const traitsIds = character?.traits ?? [];
  const {
    isLoading: isTraitsLoading,
    data: traitsWithRoot,
    error: traitsError,
  } = useExtendedTraitsQuery(id, traitsIds, {
    enabled: traitsIds.length > 0,
  });

  const visualNovelIds = character?.visualNovels.map(vn => vn.visualNovelId) ?? [];
  const {
    isLoading: isVisualNovelsLoading,
    data: visualNovels,
    error: visualNovelsError,
  } = useRelatedVisualNovelsQuery(Number(id), visualNovelIds, {
    enabled: visualNovelIds.length > 0,
  });

  if (traitsError) {
    return <Error error={traitsError} />;
  }

  if (visualNovelsError) {
    return <Error error={visualNovelsError} />;
  }

  const characterInstances = character && character.instances.length > 0 && (
    <TagList
      title="Character instances"
      tags={character.instances.map(instance => ({
        name: instance.name,
        note: instance.originalName,
        path: `/character/${instance.id}`,
      }))}
    />
  );

  const relatedVisualNovels = character && character.visualNovels.length > 0 && visualNovels && visualNovels.length > 0 && (
    <TagList
      title="Visual novels"
      tags={visualNovels.map(vn => ({
        name: vn.title,
        note: CharacterRole.toReadable(
          character.visualNovels.find(characterVn => characterVn.visualNovelId === vn.id)?.role ?? CharacterRole.Appears,
        ),
        path: `/vn/${vn.id}`,
      }))}
    />
  );

  return (
    <ContentWrapper isLoading={isCharacterLoading || isTraitsLoading || isVisualNovelsLoading} error={characterError}>
      {character && (
        <>
          <Grid gridTemplateColumns="var(--chakra-sizes-48) 1fr" pt="8" gap="8">
            <Image
              src={character.image ?? undefined}
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
                    {character.name}
                  </Heading>
                  <Heading as="h2" size="sm" fontWeight="normal">
                    {character.originalName}
                  </Heading>
                </Box>
                <Box>
                  <VStack alignItems="initial">
                    {character.aliases && (
                      <CharacterDetail title="Aliases" detail={character.aliases} />
                    )}
                    {character.gender && (
                      <CharacterDetail title="Gender" detail={CharacterGender.toReadable(character.gender)} />
                    )}
                    <HStack spacing="6">
                      {character.height && (
                        <CharacterDetail title="Height" detail={`${character.height}cm`} />
                      )}
                      {character.weight && (
                        <CharacterDetail title="Height" detail={`${character.weight}kg`} />
                      )}
                    </HStack>
                  </VStack>
                </Box>
                {character.description ? <BBCode text={character.description} /> : <Text>No description.</Text>}
              </VStack>
            </Box>
          </Grid>
          <Grid gridTemplateColumns="repeat(3, 1fr)" mt="8" gap="8">
            {traitsWithRoot && <CharacterTraits traits={traitsWithRoot} />}
            {characterInstances}
            {relatedVisualNovels}
          </Grid>
        </>
      )}
    </ContentWrapper>
  );
};
