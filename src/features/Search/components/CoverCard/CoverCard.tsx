import React, { memo, ReactNode, VFC } from 'react';
import { Box, Heading, Link, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SafeImage } from '../../../../components';

interface Props {

  /** Link.*/
  readonly link: string;

  /** Title. */
  readonly title: string;

  /** Image url. */
  readonly image: string | null;

  /** Whether image is nsfw. */
  readonly isImageNsfw: boolean;

  /** Image placeholder. */
  readonly imagePlaceholder?: string;

  /** Children. */
  readonly children?: ReactNode;
}

/** Cover card. */
const CoverCardComponent: VFC<Props> = ({
  image,
  title,
  isImageNsfw,
  link,
  imagePlaceholder,
  children,
}) => {
  const cardBox = (
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
        to={link}
      >
        <SafeImage
          src={image}
          fallbackSrc={imagePlaceholder}
          containerProps={{
            borderRadius: 'sm',
          }}
          isNsfw={isImageNsfw}
          style={{ aspectRatio: '5 / 7' }}
          w="full"
          objectFit="cover"
        />
      </Link>
      <Link
        as={RouterLink}
        variant="no-underline"
        to={link}
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

  );

  if (children != null) {
    return (
      <Popover
        trigger="hover"
        placement="right-start"
        openDelay={0}
        closeDelay={0}
        isLazy
      >
        <PopoverTrigger>
          {cardBox}
        </PopoverTrigger>
        <PopoverContent
          p={4}
          display="flex"
          flexDirection="column"
          gap={8}
          width="min-content"
          pointerEvents="none"
        >
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  return cardBox;
};

export const CoverCard = memo(CoverCardComponent);
