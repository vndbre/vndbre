'use client';

import type { SessionProviderProps } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';

export const AuthProvider = ({ children, session }: SessionProviderProps) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
);
