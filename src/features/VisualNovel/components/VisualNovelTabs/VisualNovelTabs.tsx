import React, { FC, memo } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { VisualNovelTabInfo } from '../../utils/constants';
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
  const tabs = VisualNovelTabInfo.map(tabInfo => (
    <Link to={`/vn/${id}/${tabInfo.path}`}>
      <Tab>{tabInfo.name}</Tab>
    </Link>
  ));

  return (
    <nav className={cls.tabs}>
      <Tabs colorScheme="orange">
        <TabList>
          {tabs}
        </TabList>
      </Tabs>
    </nav>
  );
});
