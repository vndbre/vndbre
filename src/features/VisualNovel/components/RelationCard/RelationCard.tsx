import React, { memo, VFC } from 'react';
import { Box, Flex, Grid, GridItem, Heading, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { VisualNovelRelation } from '../../../../models/visualNovels/visualNovelRelation';
import { SafeImage } from '../../../../components';

interface RelationCardProps {

  /** Related novel id. */
  readonly id: number;

  /** Related novel title. */
  readonly title: string;

  /** Is related novel official. */
  readonly isOfficial: boolean;

  /** Relation type to show. Example: `Sequel`. */
  readonly relationType: VisualNovelRelation;

  /** Image url. */
  readonly image: string | null;

  /** Whether the related has nsfw image. */
  readonly isImageNsfw: boolean;
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
  isImageNsfw,
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
    <SafeImage
      src={image ?? undefined}
      fallbackSrc={vnPosterPlaceholder}
      borderRadius="lg"
      h="full"
      w="full"
      isImageNsfw={isImageNsfw}
      objectFit="cover"
      containerProps={{
        borderRadius: 'lg',
      }}
    />
    <GridItem p="3">
      <Flex direction="column" justify="space-between" h="full">
        <Box>
          {isOfficial === false && <Text as="span" fontSize="xs">Unofficial</Text>}
          <Link as={NavLink} to={`/vn/${id}`}>
            <Heading lineHeight="22px" as="h4" size="xs">{title}</Heading>
          </Link>
        </Box>
        <Text fontSize="xs">{VisualNovelRelation.toReadable(relationType)}</Text>
      </Flex>
    </GridItem>
  </Grid>
);

export const RelationCard = memo(RelationCardComponent);
