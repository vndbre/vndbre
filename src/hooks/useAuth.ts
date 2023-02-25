import { useSession } from 'next-auth/react';
import { userSchema } from 'src/api/models/user';

/** TODO. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
  const { status, data } = useSession();
  const isAuthenticated = status === 'authenticated';

  return {
    isAuthenticated,
    user: isAuthenticated && data ? userSchema.parse(data.user) : null,
  };
};
