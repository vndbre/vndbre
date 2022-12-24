import type { FC } from 'react';
import React, { memo } from 'react';
import { Button } from '../../../../components/Button/Button';
import { ButtonGroup } from '../../../../components/ButtonGroup/ButtonGroup';
import { IconButton } from '../../../../components/IconButton/IconButton';

interface Props {

  /** English title. */
  readonly titleEnglish: string;

  /** Romaji title. */
  readonly titleRomaji: string;
}

/** Vn header. */
const VnHeaderComponent: FC<Props> = ({
  titleEnglish,
  titleRomaji,
}) => (
  <header className="w-full flex flex-row gap-4 items-start justify-between">
    <hgroup className="flex flex-col gap-2 items-start">
      <h1 className="text-lg leading-8 tracking-tight font-bold">{titleEnglish}</h1>
      <h2 className="text-base">{titleRomaji}</h2>
    </hgroup>
    <div className="flex gap-2 items-center">
      <IconButton name="edit" intent="tertiary" />
      <IconButton name="star" intent="tertiary" />
      <IconButton name="flag" intent="tertiary" />
      <ButtonGroup>
        <Button hasSmallPaddings intent="secondary">Add to list</Button>
        <IconButton name="chevron-down" intent="secondary" />
      </ButtonGroup>
    </div>
  </header>
);

export const VnHeader = memo(VnHeaderComponent);
