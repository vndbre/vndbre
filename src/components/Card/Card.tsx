import type { FC } from 'react';
import { memo } from 'react';
import { Poster } from '../Poster/Poster';

interface Props {

  /** Card image url. */
  readonly imageUrl?: string;

  /** Title. */
  readonly title: string;
}

/** Card component. */
const CardComponent: FC<Props> = ({ title, imageUrl = 'https://s2.vndb.org/cv/55/46255.jpg' }) => (
  <div className="flex flex-col gap-1">
    <Poster alt="title" src={imageUrl} />
    <div className="line-clamp-2 text-sm font-medium leading-6">{title}</div>
  </div>
);

export const Card = memo(CardComponent);
