import React, { memo, VFC } from 'react';
import { Box, Flex, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import vnPosterPlaceholder from '../../../../assets/star.svg';

interface RelationCardProps {

  /** Related novel title. */
  readonly title: string;

  /** Is related novel official. */
  readonly isOfficial: boolean;

  /** Relation type to show. Example: `Sequel`. */
  readonly relationType: string;

  /** Image url. */
  readonly image?: string;
}

/**
 * Related card.
 */
const RelationCardComponent: VFC<RelationCardProps> = ({
  title,
  isOfficial,
  relationType,
  image,
}) => (
  <Grid gridTemplateColumns="20 1fr" borderRadius="lg" h="28" minWidth="72" overflow="hidden" bg="gray.100">
    <Image src={image} fallbackSrc={vnPosterPlaceholder} borderRadius="lg" h="full" w="full" />
    <GridItem p="3">
      <Flex direction="column" justify="space-between">
        <Box>
          {!isOfficial && <Text as="span">Unofficial</Text>}
          <Heading lineHeight="22px" as="h4" size="sm">{title}</Heading>
        </Box>
        <Text fontSize="xs">{relationType}</Text>
      </Flex>
    </GridItem>
  </Grid>
);

export const RelationCard = memo(RelationCardComponent);
