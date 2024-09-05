import type { FC } from 'react';
import { memo } from 'react';
import { Link } from '../Link/Link';
import { Poster } from '../Poster/Poster';

interface Props {

  /** Card image url. */
  readonly imageUrl?: string;

  /** Title. */
  readonly title: string;

  /** Path to entity. */
  readonly path: string;

  /** Whether image should be blurred or not. */
  readonly isBlurred?: boolean;
}

/** Card component. */
const CardComponent: FC<Props> = ({ title, imageUrl = 'https://s2.vndb.org/cv/55/46255.jpg', path, isBlurred = false }) => (
  <Link href={path} color="on-hover" underline="never">
    <div className="flex flex-col gap-1">
      <Poster
        alt={title}
        src={imageUrl}
        isBlurred={isBlurred}
      />
      <div className="whitespace-normal text-caption-18 line-clamp-2">{title}</div>
    </div>
  </Link>
);

export const Card = memo(CardComponent);
