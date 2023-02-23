import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/** Hook to get previously accessed route. */
export const usePreviousRoute = (): string | null => {
  const router = useRouter();

  const [path, setPath] = useState<string | null>(null);

  /** Handle history change. */
  const handleHistoryChange = (): void => {
    setPath(router.asPath);
  };

  router.events?.on('beforeHistoryChange', handleHistoryChange);

  useEffect(() => () => {
    router.events?.off('beforeHistoryChange', handleHistoryChange);
  });

  return path;
};
