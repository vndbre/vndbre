import React, { memo, ReactNode, VFC } from 'react';
import { Box, Image, Link, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import cls from './CoverCard.module.css';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';

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
  const InfoBox = memo(({ name, data }: { name: string; data: string | number; }) => (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box fontSize="sm">{name}</Box>
      <Box fontWeight="semibold" whiteSpace="nowrap">{data}</Box>
    </Box>
  ));

  const ListInfoBox = memo(({ name, items }: { name: string; items: ReactNode; }) => (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box fontWeight="semibold">{name}</Box>
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
          className={cls.card}
          display="flex"
          gridGap={2}
          flexDirection="column"
          w="100%"
        >
          <Link
            as={RouterLink}
            variant="no-underline"
            to={`/vn/${id}`}
            position="relative"
            style={{ aspectRatio: '5 / 7' }}
          >
            <Image
              src={image ?? undefined}
              borderRadius="sm"
              position="absolute"
              h="100%"
              w="100%"
              objectFit="cover"
            />
          </Link>
          <Link
            as={RouterLink}
            variant="no-underline"
            to={`/vn/${id}`}
            className={cls.title}
            fontWeight="medium"
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
          <InfoBox name="Released" data={released ? released.getFullYear() : 'Unknown'} />
          <InfoBox name="Rating" data={rating} />
          <InfoBox name="Length" data={length ?? 'Unknown'} />
        </Box>
        <Box
          display="flex"
          gap={12}
        >
          <ListInfoBox
            name="Languages"
            items={languages.map(language => <Icon name={Language.getLanguageIcon(language)} />)}
          />
          <ListInfoBox
            name="Platforms"
            items={platforms.map(platform => <Icon name={Platform.getPlatformIcon(platform)} />)}
          />
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export const CoverCard = memo(CoverCardComponent);
