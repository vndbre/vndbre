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
      <div className="line-clamp-2 text-caption-18 whitespace-normal">{title}</div>
    </div>
  </Link>
);

export const Card = memo(CardComponent);
