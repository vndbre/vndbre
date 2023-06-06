'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { FC } from 'react';
import { useCallback } from 'react';
import type { TabValue } from '../SearchHeaderTabs/SearchHeaderTabs';
import { SearchHeaderTabs } from '../SearchHeaderTabs/SearchHeaderTabs';

/** Header for search pages. */
export const SearchHeader: FC = () => {
  const router = useRouter();
  const pathname = usePathname() ?? '';
  const activeTabValue = pathname.split('/').at(-1) as TabValue;

  const handleTabChange = useCallback((tabName: TabValue) => {
    const path = `/search/${tabName}` as const;
    router.push(path);
  }, []);

  return (
    <header>
      <SearchHeaderTabs value={activeTabValue} onChange={handleTabChange} />
    </header>
  );
};
