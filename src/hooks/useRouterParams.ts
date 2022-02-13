import { useParams } from 'react-router';

/**
 * Returns casted route params without `undefined` type.
 */
export function useRouteParams<T extends object>(): T {
  // This is workaround for `useParams` hook, since it returns `string | undefined`
  const params = useParams() as T;
  return params;
}
