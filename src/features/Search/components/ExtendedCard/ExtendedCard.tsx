import React, { memo, VFC } from 'react';
import { Box, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardDetail } from '../CardDetail/CardDetail';
import { CardDetailList } from '../CardDetailList/CardDetailList';
import { DETAIL_DATA_NULL } from '../../utils/constants';
import { SafeImage } from '../../../../components';

interface Props {

  /** Visual novel. */
  readonly vn: VisualNovel;
}

/** Cover card. */
const ExtendedCardComponent: VFC<Props> = ({
  vn: {
    id,
    title,
    image,
    released,
    rating,
    length,
    platforms,
    languages,
    isImageNsfw,
  },
}) => (
  <Box
    display="flex"
    borderRadius="lg"
    overflow="hidden"
    backgroundColor="gray.100"
    maxH="320px"
  >
    <Link
      as={RouterLink}
      variant="no-underline"
      to={`/vn/${id}`}
      h="full"
      style={{ aspectRatio: '5 / 7' }}
      data-peer
    >
      <SafeImage
        src={image}
        containerProps={{
          h: 'full',
          borderRadius: 'lg',
        }}
        objectFit="cover"
        h="full"
        maxW="unset"
        style={{ aspectRatio: '5 / 7' }}
        isNsfw={isImageNsfw}
      />
    </Link>
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      gap={8}
      overflowY="auto"
    >
      <Link
        as={RouterLink}
        variant="no-underline"
        to={`/vn/${id}`}
      >
        <Heading
          as="h2"
          fontSize="md"
          fontWeight="medium"
        >
          {title}
        </Heading>
      </Link>
      <Box
        display="flex"
        gap={12}
      >
        <CardDetail title="Released" text={released ? released.getFullYear() : DETAIL_DATA_NULL} />
        <CardDetail title="Rating" text={rating} />
        <CardDetail title="Length" text={length ?? DETAIL_DATA_NULL} />
      </Box>
      <Box
        display="flex"
        gap={12}
      >
        <CardDetailList
          title="Languages"
          items={languages}
          readableMapper={Language.toReadable}
          iconMapper={Language.getIcon}
        />
        <CardDetailList
          title="Platforms"
          items={platforms}
          readableMapper={Platform.toReadable}
          iconMapper={Platform.getIcon}
        />
      </Box>
    </Box>
  </Box>
);

export const ExtendedCard = memo(ExtendedCardComponent);
