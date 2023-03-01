import React, { memo, useCallback } from 'react';
import type { FC } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import { Settings } from '../Settings/Settings';

/** App header. */
const AppHeaderComponent: FC = () => {
  const { isAuthenticated } = useAuth();

  const handleLogoutButtonClick = useCallback(() => {
    signOut();
  }, []);

  return (
    <header className="flex h-16 w-full justify-center border-b border-gray-200">
      <div className="relative grid w-full max-w-screen-xl grid-cols-3 items-center justify-between gap-2 px-6">
        <Logo />
        <Button
          as={NextLink}
          href="/search/vn"
          className="text-caption-18 max-w-[400px]"
          intent="tertiary"
          size="sm"
          leftElement={<Icon size="sm" name="search" />}
        >
          Search
        </Button>

        <div className="flex items-center gap-2 justify-self-end">
          <Settings />
          {isAuthenticated && (
            <>
              <Button intent="quaternary" onClick={handleLogoutButtonClick}>Log out</Button>
              <Avatar />
            </>
          )}

          {!isAuthenticated && <Button as={NextLink} size="sm" intent="quaternary" href="/auth/login">Login</Button>}
        </div>
      </div>
    </header>
  );
};

export const AppHeader = memo(AppHeaderComponent);
