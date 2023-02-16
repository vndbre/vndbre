import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCallback } from 'react';
import type { TabValue } from '../SearchHeaderTabs/SearchHeaderTabs';
import { SearchHeaderTabs } from '../SearchHeaderTabs/SearchHeaderTabs';

/** Header for search pages. */
export const SearchHeader: FC = () => {
  const router = useRouter();
  const activeTabValue = router.route.split('/').at(-1) as TabValue;

  const handleTabChange = useCallback((tabName: TabValue) => {
    router.push({
      pathname: `./${tabName}`,
    });
  }, []);

  return (
    <header className="mb-4">
      <SearchHeaderTabs value={activeTabValue} onChange={handleTabChange} />
    </header>
  );
};
