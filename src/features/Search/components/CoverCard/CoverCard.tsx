import React, { memo, VFC } from 'react';
import { Box, Image, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import cls from './CoverCard.module.css';

interface Props {

  /** Id. */
  readonly id: number;

  /** Image. */
  readonly image?: string;

  /** Title. */
  readonly title: string;
}

/** Cover card. */
const CoverCardComponent: VFC<Props> = ({
  id,
  image,
  title,
}) => (
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
      w="100%"
      h="0"
      pb="142.307692%"
      position="relative"
    >
      <Image
        src={image}
        borderRadius="md"
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
    >
      {title}
    </Link>
  </Box>
);

export const CoverCard = memo(CoverCardComponent);
