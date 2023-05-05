'use client';

import { useSession } from 'next-auth/react';
import { authInfoSchema } from 'src/api/models/authInfo';

/** Hook that gives access to the authentication info of the current user. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
  const { status, data } = useSession();
  const isAuthenticated = status === 'authenticated';

  return {
    isAuthenticated,
    user: isAuthenticated && data ? authInfoSchema.parse(data.user) : null,
  };
};
