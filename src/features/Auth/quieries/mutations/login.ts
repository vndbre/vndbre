import { useMutation, UseMutationResult } from 'react-query';
import { AuthData } from '../../../../models/authData';
import { useAuthContext } from '../../../../providers';

/** Custom hook for login mutation query. */
export const useLoginMutation = (): UseMutationResult<void, unknown, AuthData.Login, unknown> => {
  const { login } = useAuthContext();

  return useMutation((data: AuthData.Login) => login(data));
};
