import React, { memo, VFC } from 'react';
import { Box, Flex, Grid, GridItem, Heading, Image, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { VisualNovelRelationService } from '../../../../api/services/visualNovelRelationService';
import { RelationType } from '../../../../models/visualNovel';

interface RelationCardProps {

  /** Related novel id. */
  readonly id: number;

  /** Related novel title. */
  readonly title: string;

  /** Is related novel official. */
  readonly isOfficial: boolean;

  /** Relation type to show. Example: `Sequel`. */
  readonly relationType: RelationType;

  /** Image url. */
  readonly image: string | null;
}

/**
 * Related visual novel card.
 */
const RelationCardComponent: VFC<RelationCardProps> = ({
  id,
  title,
  isOfficial,
  relationType,
  image,
}) => (
  <Grid
    gridTemplateColumns="var(--chakra-sizes-20) 1fr"
    borderRadius="lg"
    h="28"
    minW="72"
    overflow="hidden"
    bg="gray.100"
    gridTemplateRows="100%"
  >
    <Image src={image ?? undefined} fallbackSrc={vnPosterPlaceholder} borderRadius="lg" h="full" w="full" objectFit="cover" />
    <GridItem p="3">
      <Flex direction="column" justify="space-between" h="full">
        <Box>
          {!isOfficial && <Text as="span" fontSize="xs">Unofficial</Text>}
          <Link as={NavLink} to={`/vn/${id}`}><Heading lineHeight="22px" as="h4" size="xs">{title}</Heading></Link>
        </Box>
        <Text fontSize="xs">{VisualNovelRelationService.toReadable(relationType)}</Text>
      </Flex>
    </GridItem>
  </Grid>
);

export const RelationCard = memo(RelationCardComponent);
