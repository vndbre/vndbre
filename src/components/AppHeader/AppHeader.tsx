import React, { memo, useCallback } from 'react';
import type { FC } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { signOut } from 'next-auth/react';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Avatar } from '../Avatar/Avatar';
import { Link } from '../Link/Link';

/** App header. */
const AppHeaderComponent: FC = () => {
  const { isAuthenticated, user } = useAuth();

  console.log(user);

  const handleLogoutButtonClick = useCallback(() => {
    signOut();
  }, []);

  return (
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

        <div className="flex items-center gap-2 justify-self-end">
          {isAuthenticated && (
            <>
              <Button intent="quaternary" onClick={handleLogoutButtonClick}>Log out</Button>
              <Avatar />
            </>
          )}

          {!isAuthenticated && <Link color={false} href="/auth/login">Login</Link>}
        </div>
      </div>
    </header>
  );
};

export const AppHeader = memo(AppHeaderComponent);
