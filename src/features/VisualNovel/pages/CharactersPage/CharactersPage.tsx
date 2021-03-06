import React, { ReactNode, VFC } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import { ContentWrapper } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { Character } from '../../../../models/characters/character';
import { CharacterCard } from '../../components';
import { useCharactersQuery } from '../../queries';
import { CharacterRole } from '../../../../models/characters/characterRole';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/** Describes shape of grouped characters. */
type GroupedCharacters = Record<CharacterRole, Character[]>;

/**
 * Obtains list of characters.
 * @param characters Characters.
 */
function getCharacterList(characters: Character[]): ReactNode[] {
  return (characters.map(character => (
    <GridItem key={character.id}>
      <CharacterCard character={character} />
    </GridItem>
  )));
}

/** Character page component. */
export const CharactersPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { data, isLoading: isCharactersLoading, error: charactersError } = useCharactersQuery(Number(id));

  /** Returns grouped characters by role. */
  const groupCharacters = (): GroupedCharacters => {
    const groupedCharacters: GroupedCharacters = {
      [CharacterRole.Main]: [],
      [CharacterRole.Primary]: [],
      [CharacterRole.Side]: [],
      [CharacterRole.Appears]: [],
    };

    if (data) {
      return data.reduce((acc, cur) => {
        const role = cur.visualNovels?.find(vn => vn.visualNovelId === Number(id))?.role;
        if (role === undefined) {
          return acc;
        }

        return { ...acc, [role]: [...acc[role], cur] };
      }, groupedCharacters);
    }
    return groupedCharacters;
  };

  const groupedCharacterElements = data && (
    Object.entries(groupCharacters()).map(([role, characters]) => (
      characters.length > 0 && (
        <AccordionItem key={role}>
          <Heading as="h2" fontWeight="semibold">
            <AccordionButton>
              <HStack spacing={2}>
                <Text fontWeight="bold" fontSize="sm">
                  {CharacterRole.toReadable(role as CharacterRole)}
                </Text>
                <Badge>{characters.length}</Badge>
                <AccordionIcon />
              </HStack>

            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <Grid templateColumns="repeat(auto-fill, minmax(var(--chakra-sizes-72), 1fr))" gridGap="4">
              {getCharacterList(characters)}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      )
    ))
  );

  return (
    <ContentWrapper isLoading={isCharactersLoading} error={charactersError}>
      {data && data?.length > 0 ? (
        <Accordion defaultIndex={[0]} allowMultiple>
          {groupedCharacterElements}
        </Accordion>
      ) :

      // TODO (Maximov): Replace it after design will be implemented.
        <Text>No characters :(</Text>}
    </ContentWrapper>
  );
};
