import { useRouter } from 'next/router';

/** Hook to check whether current route is freshly loaded or navigated from another route. */
export const useIsInitialRoute = (): boolean => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components = (router as any).components as any as Record<string, { initial?: boolean; }>;
  return components?.[router.route]?.initial ?? false;
};
