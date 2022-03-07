import React, { VFC } from 'react';
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
  useMediaQuery,
} from '@chakra-ui/react';
import { ContentWrapper } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { Character } from '../../../../models/characters/character';
import { CharacterCard } from '../../components';
import { useCharactersQuery } from '../../queries';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';
import { CharacterRole } from '../../../../models/characters/characterRole';

/** Describes shape of grouped characters. */
type GroupedCharacters = Record<CharacterRole, Character[]>;

/** Character page component. */
export const CharactersPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { data, isLoading: isCharactersLoading, error: charactersError } = useCharactersQuery(Number(id));

  /** Displays list of characters. */
  const displayCharacterList = (characters: Character[]): JSX.Element[] => (
    characters.map(character => (
      <GridItem key={character.id}>
        <CharacterCard character={character} />
      </GridItem>
    ))
  );

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

  const [canFit4OrMore, canFitOnly3, canFitOnly2] = useMediaQuery(
    ['(min-width: 1564px)', '(min-width: 1280px)', '(min-width: 1024px)'],
  );

  let columnCount = 4;
  if (canFit4OrMore) {
    columnCount = 4;
  } else if (canFitOnly3) {
    columnCount = 3;
  } else if (canFitOnly2) {
    columnCount = 2;
  } else {
    columnCount = 1;
  }

  const groupedCharacterElements = data && (
    Object.entries(groupCharacters()).map(([role, characters]) => (
      <AccordionItem key={role}>
        <Heading as="h2">
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
          <Grid templateColumns={`repeat(${columnCount}, minmax(var(--chakra-sizes-72), 1fr))`} gridGap="4">
            {displayCharacterList(characters)}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
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
