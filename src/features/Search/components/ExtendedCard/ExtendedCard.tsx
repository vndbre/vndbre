import React, { memo, VFC } from 'react';
import { Box, Image, Link, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardInfoBox } from '../CardInfoBox/CardInfoBox';
import { CardListInfoBox } from '../CardListInfoBox/CardListInfoBox';

interface Props {

  /** Visual novel. */
  readonly vn: VisualNovel;
}

/** Cover card. */
const ExtendedCardComponent: VFC<Props> = ({
  vn: {
    id,
    description,
    title,
    image,
    released,
    rating,
    length,
    platforms,
    languages,
  },
}) => (
  <Box
    display="flex"
    borderRadius="lg"
    overflow="hidden"
    backgroundColor="gray.100"
    h="full"
    maxH="320px"
  >
    <Link
      as={RouterLink}
      variant="no-underline"
      to={`/vn/${id}`}
      h="full"
      style={{ aspectRatio: '5 / 7' }}
    >
      <Image
        src={image ?? undefined}
        objectFit="cover"
        h="full"
        maxW="unset"
        style={{ aspectRatio: '5 / 7' }}
        borderRadius="lg"
      />
    </Link>
    <Box
      py={4}
      px={4}
      display="flex"
      flexDirection="column"
      gap={8}
      overflowY="auto"
    >
      <Box fontWeight="semibold">{title}</Box>
      <Box
        display="flex"
        gap={12}
      >
        <CardInfoBox title="Released" text={released ? released.getFullYear() : 'Unknown'} />
        <CardInfoBox title="Rating" text={rating} />
        <CardInfoBox title="Length" text={length ?? 'Unknown'} />
      </Box>
      <Box
        display="flex"
        gap={12}
      >
        <CardListInfoBox
          title="Languages"
          items={languages.map(language => <Icon name={Language.getLanguageIcon(language)} />)}
        />
        <CardListInfoBox
          title="Platforms"
          items={platforms.map(platform => <Icon name={Platform.getPlatformIcon(platform)} />)}
        />
      </Box>
    </Box>
  </Box>
);

export const ExtendedCard = memo(ExtendedCardComponent);
