import React, { memo } from 'react';
import type { FC } from 'react';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Avatar } from '../Avatar/Avatar';

/** App header. */
const AppHeaderComponent: FC = () => (
  <header className="flex h-16 w-full justify-center border-b border-gray-200">
    <div className="relative grid w-full max-w-screen-xl grid-cols-3 items-center justify-between gap-2 px-6">
      <Logo />
      <Button
        className="max-w-[400px]"
        intent="tertiary"
        size="sm"
      >
        Search
      </Button>
      <Avatar className="justify-self-end" />
    </div>
  </header>
);

export const AppHeader = memo(AppHeaderComponent);
