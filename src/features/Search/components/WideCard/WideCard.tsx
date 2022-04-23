import React, { memo, VFC } from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Platform } from '../../../../models/platform';
import { Language } from '../../../../models/language';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardDetail } from '../CardDetail/CardDetail';
import { CardDetailList } from '../CardDetailList/CardDetailList';
import { DETAIL_DATA_NULL } from '../../utils/constants';
import { SafeImage } from '../../../../components';
import imagePlaceholder from '../../../../assets/star.svg';

interface Props {

  /** Visual novel data. */
  readonly vn: VisualNovel;

  /** Whether image is nsfw. */
  readonly isImageNsfw: boolean;
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
  isImageNsfw,
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
    <SafeImage
      fallbackSrc={imagePlaceholder}
      src={image}
      style={{ aspectRatio: '5 / 7' }}
      h={20}
      w="auto"
      containerProps={{
        borderRadius: 'sm',
      }}
      objectFit="cover"
      isNsfw={isImageNsfw}
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
        alignment="end"
        items={languages}
        readableMapper={Language.toReadable}
        iconMapper={Language.getIcon}
      />
      <CardDetailList
        items={platforms}
        readableMapper={Platform.toReadable}
        iconMapper={Platform.getIcon}
      />
      <CardDetail title="Released" text={released ? released.getFullYear() : DETAIL_DATA_NULL} />
      <CardDetail title="Rating" text={rating} />
      <CardDetail title="Length" text={length ?? DETAIL_DATA_NULL} />
    </Box>
  </Link>
);

export const WideCard = memo(WideCardComponent);
