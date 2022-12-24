import React, { memo } from 'react';
import type { FC } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';

/** App header. */
const AppHeaderComponent: FC = () => (
  <header className="border-b border-gray-200 flex justify-center h-16 w-full">
    <div className="relative grid grid-cols-3 items-center gap-2 justify-between w-full max-w-screen-xl px-6">
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
