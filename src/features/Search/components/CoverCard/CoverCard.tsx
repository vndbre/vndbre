import React, { memo, VFC } from 'react';
import { Box, Heading, Image, Link, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardDetail } from '../CardDetail/CardDetail';
import { CardDetailList } from '../CardDetailList/CardDetailList';
import { DETAIL_DATA_NULL } from '../../utils/constants';

interface Props {

  /** Visual novel data. */
  readonly vn: VisualNovel;
}

/** Cover card. */
const CoverCardComponent: VFC<Props> = ({
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
  <Popover
    trigger="hover"
    placement="right-start"
    openDelay={0}
    closeDelay={0}
    isLazy
  >
    <PopoverTrigger>
      <Box
        role="group"
        display="flex"
        gridGap={2}
        flexDirection="column"
        w="full"
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
            w="full"
            objectFit="cover"
          />
        </Link>
        <Link
          as={RouterLink}
          variant="no-underline"
          to={`/vn/${id}`}
        >
          <Heading
            as="h2"
            _groupHover={{
              /* TODO(V1.8+): use chakra semantic tokens */
              color: 'var(--color-link)',
            }}
            fontSize="sm"
            fontWeight="medium"
            noOfLines={2}
          >
            {title}
          </Heading>
        </Link>
      </Box>
    </PopoverTrigger>
    <PopoverContent
      p={4}
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
    </PopoverContent>
  </Popover>
);

export const CoverCard = memo(CoverCardComponent);
