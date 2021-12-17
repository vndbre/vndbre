import React, { FC, memo } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { visualNovelTabInfo } from '../../utils/constants';
import cls from './VisualNovelTabs.module.css';

interface VisualNovelTabsProps {

  /**
   * Id of visual novel.
   */
  id: string;
}

/**
 * Component for navigation on visual novel page.
 * TODO (Panov A.): Add badges to tabs.
 */
export const VisualNovelTabs: FC<VisualNovelTabsProps> = memo(({ id }) => {
  const location = useLocation();

  const tabs = visualNovelTabInfo.map(tabInfo => (
    <Link key={tabInfo.name} to={`/vn/${id}/${tabInfo.path}`}>
      <Tab>{tabInfo.name}</Tab>
    </Link>
  ));

  /** Calculate default index for tabs. */
  const getDefaultTabIndex = (): number => {
    const splitPath = location.pathname.split('/');
    const activeRoute = splitPath[splitPath.length - 1];
    return visualNovelTabInfo.findIndex(tabInfo => tabInfo.path === activeRoute);
  };

  const defaultTabIndex = getDefaultTabIndex();

  return (
    <nav>
      <Tabs defaultIndex={defaultTabIndex} colorScheme="orange">
        <TabList className={cls.tabList}>
          {tabs}
        </TabList>
      </Tabs>
    </nav>
  );
});
