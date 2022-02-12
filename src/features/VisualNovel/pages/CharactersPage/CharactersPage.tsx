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
} from '@chakra-ui/react';
import { ContentWrapper } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { Character } from '../../../../models/character';
import { Roles } from '../../../../utils/types/roles';
import { CharacterCard } from '../../components';
import { useCharactersQuery } from '../../queries';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/** Describes shape of grouped characters. */
type GroupedCharacters = Record<Roles, Character[]>;

/** Character page component. */
export const CharactersPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { data, isLoading: isCharactersLoading, error: charactersError } = useCharactersQuery(id);

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
      [Roles.Main]: [],
      [Roles.Primary]: [],
      [Roles.Side]: [],
      [Roles.Appears]: [],
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
      <AccordionItem key={role}>
        <Heading as="h2">
          <AccordionButton>
            <HStack spacing={2}>
              <Text fontWeight="bold" fontSize="sm">
                {Roles.toReadable(role as Roles)}
              </Text>
              <Badge>{characters.length}</Badge>
              <AccordionIcon />
            </HStack>

          </AccordionButton>
        </Heading>
        <AccordionPanel>
          <Grid pt="4" templateColumns="repeat(auto-fit, minmax(var(--chakra-sizes-72), 1fr))" gridGap="4">
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

      ) : <Text>No characters :(</Text>}
    </ContentWrapper>
  );
};
