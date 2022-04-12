import React, { memo, VFC } from 'react';
import { Box, Image, Link, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardDetail } from '../CardDetail/CardDetail';
import { CardDetailList } from '../CardDetailList/CardDetailList';

interface Props {

  /** Visual novel data. */
  readonly vn: VisualNovel;
}

/** Wide card. */
const WideCardComponent: VFC<Props> = ({
  vn: {
    id,
    image,
    title,
    released,
    rating,
    length,
    platforms,
    languages,
  },
}) => (
  <Link
    as={RouterLink}
    variant="unstyled"
    to={`/vn/${id}`}
    backgroundColor="gray.100"
    borderRadius="md"
    overflow="hidden"
    display="flex"
  >
    <Image
      src={image ?? undefined}
      borderRadius="sm"
      style={{ aspectRatio: '5 / 7' }}
      h={20}
      w="auto"
      objectFit="cover"
    />
    <Box
      w="full"
      p={4}
      display="grid"
      gridTemplateColumns="2fr minmax(calc((24px + 4px)*8), 1fr) minmax(calc((24px + 4px)*8), 1fr) 80px 80px 120px"
      gap={8}
    >
      <Box
        fontWeight="medium"
        mr="auto"
        noOfLines={2}
      >
        {title}
      </Box>
      <CardDetailList
        justify="end"
        items={languages.map(language => (
          <Tooltip key={language} label={Language.toReadable(language)}>
            <span>
              <Icon name={Language.getLanguageIcon(language)} />
            </span>
          </Tooltip>
        ))}
      />
      <CardDetailList
        justify="end"
        items={platforms.map(platform => (
          <Tooltip key={platform} label={Platform.toReadable(platform)}>
            <span>
              <Icon name={Platform.getPlatformIcon(platform)} />
            </span>
          </Tooltip>
        ))}
      />
      <CardDetail title="Released" text={released ? released.getFullYear() : 'Unknown'} />
      <CardDetail title="Rating" text={rating} />
      <CardDetail title="Length" text={length ?? 'Unknown'} />
    </Box>
  </Link>
);

export const WideCard = memo(WideCardComponent);
