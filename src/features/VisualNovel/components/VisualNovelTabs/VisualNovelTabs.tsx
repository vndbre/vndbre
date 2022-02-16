import React, { VFC, memo, useState, useEffect } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { visualNovelTabInfo } from '../../utils/constants';
import cls from './VisualNovelTabs.module.css';

interface Props {

  /**
   * Id of visual novel.
   */
  id: string;
}

const FIRST_INDEX = 0;

/**
 * Calculates initial index for tabs based on route.
 * @param pathname URL pathname.
 */
const getInitialTabIndex = (pathname: string): number => {
  const splitPath = pathname.split('/');
  const activeRoute = splitPath[splitPath.length - 1];
  const tabIndex = visualNovelTabInfo.findIndex(tabInfo => tabInfo.path === activeRoute);
  return tabIndex >= FIRST_INDEX ? tabIndex : FIRST_INDEX;
};

/**
 * Component for navigation on visual novel page.
 * TODO (Panov A.): Add badges to tabs.
 */
export const VisualNovelTabs: VFC<Props> = memo(({ id }) => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(getInitialTabIndex(location.pathname));

  useEffect(() => {
    setTabIndex(getInitialTabIndex(location.pathname));
  }, [id]);

  /**
   * Handles click on tab.
   * @param index Tab index.
   */
  const onTabClick = (index: number): () => void => () => setTabIndex(index);

  /**
   * Handles key press on tab.
   * @param index Tab index.
   */
  const onTabPress = (index: number): (event: React.KeyboardEvent) => void => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setTabIndex(index);
    }
  };

  const tabs = visualNovelTabInfo.map((tabInfo, index) => (
    <Tab
      as={Link}
      key={tabInfo.name}
      to={`/vn/${id}/${tabInfo.path}`}
      onClick={onTabClick(index)}
      onKeyPress={onTabPress(index)}
    >
      {tabInfo.name}
    </Tab>
  ));

  return (
    <nav>
      <Tabs index={tabIndex} colorScheme="orange">
        <TabList className={cls.tabList}>
          {tabs}
        </TabList>
      </Tabs>
    </nav>
  );
});
