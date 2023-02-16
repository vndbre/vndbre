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
}

/** Card component. */
const CardComponent: FC<Props> = ({ title, imageUrl = 'https://s2.vndb.org/cv/55/46255.jpg', path }) => (
  <Link href={path} className="hover:text-primary-500" color={false}>
    <div className="flex flex-col gap-1">
      <Poster alt="title" src={imageUrl} />
      <div className="line-clamp-2 text-sm font-medium leading-6">{title}</div>
    </div>
  </Link>
);

export const Card = memo(CardComponent);
