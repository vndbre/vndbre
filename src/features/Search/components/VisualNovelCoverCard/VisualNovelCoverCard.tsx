import React, { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { CardDetail } from '../CardDetail/CardDetail';
import { CoverCard } from '../CoverCard/CoverCard';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CardDetailList } from '../CardDetailList/CardDetailList';
import { Language } from '../../../../models/language';
import { Platform } from '../../../../models/platform';
import { DETAIL_DATA_NULL } from '../../utils/constants';

interface Props {

  /** Visual novel. */
  readonly vn: VisualNovel;

  /** Whether image is nsfw. */
  readonly isImageNsfw: boolean;
}

/**
 * Visual novel cover card.
 */
const VisualNovelCoverCardComponent: VFC<Props> = ({
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
  isImageNsfw,
}) => (
  <CoverCard
    link={`/vn/${id}`}
    title={title}
    image={image}
    isImageNsfw={isImageNsfw}
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
  </CoverCard>
);

export const VisualNovelCoverCard = memo(VisualNovelCoverCardComponent);
