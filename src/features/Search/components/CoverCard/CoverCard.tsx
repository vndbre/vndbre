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
const CoverCardComponent: VFC<Props> = ({
  id,
  image,
  title,
  released,
  rating,
  length,
  platforms,
  languages,
}) => {
  const ListInfoBox = memo(({ title: listTitle, items }: { title: string; items: ReactNode; }) => (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box fontWeight="semibold">{listTitle}</Box>
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
      >
        {items}
      </Box>
    </Box>
  ));

  return (
    <Popover
      trigger="hover"
      placement="right-start"
      openDelay={0}
      closeDelay={50}
    >
      <PopoverTrigger>
        <Box
          role="group"
          display="flex"
          gridGap={2}
          flexDirection="column"
          w="100%"
        >
          <Link
            as={RouterLink}
            variant="no-underline"
            to={`/vn/${id}`}
          >
            <Image
              src={image ?? undefined}
              borderRadius="sm"
              style={{ aspectRatio: '5 / 7' }}
              w="100%"
              objectFit="cover"
            />
          </Link>
          {/* TODO(V1.8+): use chakra semantic tokens */}
          <Link
            as={RouterLink}
            variant="no-underline"
            to={`/vn/${id}`}
            _groupHover={{
              color: 'var(--color-link)',
            }}
            fontSize="sm"
            fontWeight="medium"
            overflow="hidden"
            textOverflow="ellipsis"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </Link>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        py={4}
        px={4}
        display="flex"
        flexDirection="column"
        gap={8}
        width="min-content"
        pointerEvents="none"
      >
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
          <ListInfoBox
            title="Languages"
            items={languages.map(language => <Icon key={language} name={Language.getLanguageIcon(language)} />)}
          />
          <ListInfoBox
            title="Platforms"
            items={platforms.map(platform => <Icon key={platform} name={Platform.getPlatformIcon(platform)} />)}
          />
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export const CoverCard = memo(CoverCardComponent);
