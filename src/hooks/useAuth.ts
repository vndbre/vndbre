import { useSession } from 'next-auth/react';

/** TODO. */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
  const { status, data } = useSession();

  console.log(data?.user);

  return {
    isAuthenticated: status === 'authenticated',
    username: data?.user?.name ?? null,
  };
};
