import React, { memo, VFC } from 'react';
import { Box, Heading, Image, Link, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardDetail } from '../CardDetail/CardDetail';
import { CardDetailList } from '../CardDetailList/CardDetailList';

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
        <CardDetail title="Released" text={released ? released.getFullYear() : 'Unknown'} />
        <CardDetail title="Rating" text={rating} />
        <CardDetail title="Length" text={length ?? 'Unknown'} />
      </Box>
      <Box
        display="flex"
        gap={12}
      >
        <CardDetailList
          title="Languages"
          items={languages.map(language => (
            <Tooltip key={language} label={Language.toReadable(language)}>
              <span>
                <Icon name={Language.getLanguageIcon(language)} />
              </span>
            </Tooltip>
          ))}
        />
        <CardDetailList
          title="Platforms"
          items={platforms.map(platform => (
            <Tooltip key={platform} label={Platform.toReadable(platform)}>
              <span>
                <Icon name={Platform.getPlatformIcon(platform)} />
              </span>
            </Tooltip>
          ))}
        />
      </Box>
    </Box>
  </Box>
);

export const ExtendedCard = memo(ExtendedCardComponent);
