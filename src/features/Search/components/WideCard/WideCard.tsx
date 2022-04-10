import React, { memo, ReactNode, VFC } from 'react';
import { Box, Image, Link, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardInfoBox } from '../CardInfoBox/CardInfoBox';

interface Props {

  /** Id. */
  readonly id: VisualNovel['id'];

  /** Image. */
  readonly image: VisualNovel['image'];

  /** Title. */
  readonly title: VisualNovel['title'];

  /** Release date. */
  readonly released: VisualNovel['released'];

  /** Rating. */
  readonly rating: VisualNovel['rating'];

  /** Length. */
  readonly length: VisualNovel['length'];

  /** Platforms. */
  readonly platforms: VisualNovel['platforms'];

  /** Languages. */
  readonly languages: VisualNovel['languages'];
}

/** Cover card. */
const WideCardComponent: VFC<Props> = ({
  id,
  image,
  title,
  released,
  rating,
  length,
  platforms,
  languages,
}) => (
  <Box
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
      <Box fontWeight="medium" mr="auto">{title}</Box>
      <Box display="flex" flexWrap="wrap" gap={1} justifyContent="flex-end">
        {languages.map(language => <Icon name={Language.getLanguageIcon(language)} />)}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {platforms.map(platform => <Icon name={Platform.getPlatformIcon(platform)} />)}
      </Box>
      <CardInfoBox title="Released" text={released ? released.getFullYear() : 'Unknown'} />
      <CardInfoBox title="Rating" text={rating} />
      <CardInfoBox title="Length" text={length ?? 'Unknown'} />
    </Box>
  </Box>

  // <Box
  //   role="group"
  //   display="flex"
  //   gridGap={2}
  //   flexDirection="column"
  //   w="100%"
  // >
  //   <Link
  //     as={RouterLink}
  //     variant="no-underline"
  //     to={`/vn/${id}`}
  //   >
  //     <Image
  //       src={image ?? undefined}
  //       borderRadius="sm"
  //       style={{ aspectRatio: '5 / 7' }}
  //       w="100%"
  //       objectFit="cover"
  //     />
  //   </Link>
  //   {/* TODO(V1.8+): use chakra semantic tokens */}
  //   <Link
  //     as={RouterLink}
  //     variant="no-underline"
  //     to={`/vn/${id}`}
  //     _groupHover={{
  //       color: 'var(--color-link)',
  //     }}
  //     fontSize="sm"
  //     fontWeight="medium"
  //     overflow="hidden"
  //     textOverflow="ellipsis"
  //     style={{
  //       display: '-webkit-box',
  //       WebkitBoxOrient: 'vertical',
  //       WebkitLineClamp: 2,
  //     }}
  //   >
  //     {title}
  //   </Link>
  // </Box>
);

export const WideCard = memo(WideCardComponent);
