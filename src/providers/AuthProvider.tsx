'use client';

import type { SessionProviderProps } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import type { FC } from 'react';

export const AuthProvider: FC<SessionProviderProps> = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
);
