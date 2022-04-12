import React, { memo, VFC } from 'react';
import { Box, Image, Link, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardInfoBox } from '../CardInfoBox/CardInfoBox';
import { CardListInfoBox } from '../CardListInfoBox/CardListInfoBox';

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
      <CardListInfoBox
        justify="end"
        items={languages.map(language => (
          <Tooltip key={language} label={Language.toReadable(language)}>
            <span>
              <Icon name={Language.getLanguageIcon(language)} />
            </span>
          </Tooltip>
        ))}
      />
      {/* <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        justifyContent="flex-end"
      >
        {languages.map((language, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tooltip key={String(id) + language + String(index)} label={Language.toReadable(language)}>
            <span>
              <Icon name={Language.getLanguageIcon(language)} />
            </span>
          </Tooltip>
        ))}
      </Box> */}
      <Box display="flex" flexWrap="wrap" gap={1}>
        {platforms.map((platform, index) => (
        // eslint-disable-next-line react/no-array-index-key
          <Tooltip key={String(id) + platform + String(index)} label={Platform.toReadable(platform)}>
            <span>
              <Icon name={Platform.getPlatformIcon(platform)} />
            </span>
          </Tooltip>
        ))}
      </Box>
      <CardInfoBox title="Released" text={released ? released.getFullYear() : 'Unknown'} />
      <CardInfoBox title="Rating" text={rating} />
      <CardInfoBox title="Length" text={length ?? 'Unknown'} />
    </Box>
  </Link>
);

export const WideCard = memo(WideCardComponent);
