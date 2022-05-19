import { useMutation, UseMutationResult } from 'react-query';
import { useAuthContext } from '../../../providers';

/** Custom hook for logout mutation query. */
export const useLogoutMutation = (): UseMutationResult<void, unknown, void, unknown> => {
  const { logout } = useAuthContext();

  return useMutation(() => logout());
};
