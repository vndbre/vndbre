'use client';

import { memo, useCallback } from 'react';
import type { FC } from 'react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';

import { useAuth } from 'src/hooks/useAuth';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import { DisplaySettings } from '../DisplaySettings/DisplaySettings';
import { ThemeSettings } from '../ThemeSettings/ThemeSettings';

/** App header. */
const AppHeaderComponent: FC = () => {
  const { isAuthenticated } = useAuth();

  const handleLogoutButtonClick = useCallback(() => {
    signOut();
  }, []);

  return (
    <header className="flex h-16 w-full justify-center">
      <div className="flex w-full justify-center px-6">
        <div className="border-border relative grid w-full max-w-screen-xl grid-cols-3 items-center justify-between gap-2 border-b">
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
            <ThemeSettings />
            <DisplaySettings />
            {isAuthenticated && (
              <>
                <Button intent="quaternary" onClick={handleLogoutButtonClick}>Log out</Button>
                <Avatar />
              </>
            )}
            {!isAuthenticated && (
              <Button
                as={NextLink}
                size="md"
                intent="quaternary"
                href="/auth/login"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export const AppHeader = memo(AppHeaderComponent);
