import React, { VFC } from 'react';
import { Box, Grid, VStack } from '@chakra-ui/react';
import { ContentWrapper, EntityDetail, EntityTitle, SafeImage, TagList } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { useCharacterQuery } from '../../queries';
import characterPlaceholder from '../../../../assets/person.svg';
import { useExtendedTraitsQuery } from '../../queries/trait';
import { CharacterTraits } from '../../components';
import { useRelatedVisualNovelsQuery } from '../../../VisualNovel/queries/visualNovel';
import { CharacterRole } from '../../../../models/characters/characterRole';
import { Gender } from '../../../../models/gender';
import { CharacterRouteParams } from '../../utils/characterRouteParams';
import { Description } from '../../../../components/Description/Description';

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
  } = useExtendedTraitsQuery(Number(id), traitsIds, {
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
    <ContentWrapper isLoading={isCharacterLoading} error={characterError}>
      <Box
        display="flex"
        flexDir="column"
        gap={8}
      >
        {character && (
          <>
            <Grid
              gridTemplateColumns={{
                base: 'var(--chakra-sizes-24) 1fr',
                md: 'var(--chakra-sizes-48) 1fr',
              }}
              gridTemplateRows="min-content 1fr"
              gridTemplateAreas={{
                base: `
                "image heading"
                "image info"
                "description description"
              `,
                md: `
                "image heading"
                "image info"
                "image description"
              `,
              }}
              gap={{
                base: 4,
                md: 8,
              }}
            >
              <SafeImage
                src={character.image}
                fallbackSrc={characterPlaceholder}
                h="auto"
                maxH="80"
                containerProps={{
                  gridArea: 'image',
                  borderRadius: 'lg',
                }}
                objectFit="cover"
                borderRadius="lg"
              />
              <Box gridArea="heading">
                <EntityTitle title={character.name} originalTitle={character.originalName} />
              </Box>
              <VStack gridArea="info" alignItems="initial">
                {character.aliases && (
                  <EntityDetail title="Aliases">{character.aliases}</EntityDetail>
                )}
                {character.gender && (
                  <EntityDetail title="Gender">{Gender.toReadable(character.gender)}</EntityDetail>
                )}
                {character.height && (
                  <EntityDetail title="Height">{`${character.height}cm`}</EntityDetail>
                )}
                {character.weight && (
                  <EntityDetail title="Weight">{`${character.weight}kg`}</EntityDetail>
                )}
              </VStack>
              <Box gridArea="description">
                <Description text={character.description} desktopHeight={100} />
              </Box>
            </Grid>
            <Grid
              gridTemplateColumns={{
                base: '1fr',
                md: 'repeat(3, 1fr)',
              }}
              gap={8}
            >
              <ContentWrapper isLoading={isVisualNovelsLoading} error={visualNovelsError}>
                {relatedVisualNovels}
              </ContentWrapper>
              <ContentWrapper isLoading={isTraitsLoading} error={traitsError}>
                {traitsWithRoot && <CharacterTraits traits={traitsWithRoot} />}
              </ContentWrapper>
              {characterInstances}
            </Grid>
          </>
        )}
      </Box>
    </ContentWrapper>
  );
};
