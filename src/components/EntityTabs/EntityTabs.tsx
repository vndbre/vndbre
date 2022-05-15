import React, { VFC, memo, useState, useEffect, useCallback } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RouteInfo } from '../../routes/utils/RouteInfo';

interface Props {

  /** Id of entity.*/
  readonly id: string;

  /** List of tabs. */
  readonly tabsInfo: readonly RouteInfo[];

  /** Entity root path. Example: `vn`. */
  readonly entityRootPath: string;
}

const FIRST_INDEX = 0;

/**
 * Calculates initial index for tabs based on route.
 * @param pathname URL pathname.
 * @param tabsInfo Info about tabs.
 */
const getInitialTabIndex = (pathname: string, tabsInfo: readonly RouteInfo[]): number => {
  const splitPath = pathname.split('/');
  const activeRoute = splitPath[splitPath.length - 1];
  const tabIndex = tabsInfo.findIndex(tabInfo => tabInfo.path === activeRoute);
  return tabIndex >= FIRST_INDEX ? tabIndex : FIRST_INDEX;
};

/**
 * Component for navigation on entity page page.
 */
export const EntityTabsComponent: VFC<Props> = ({ id, tabsInfo, entityRootPath }) => {
  const location = useLocation();
  const [currentTabIndex, setCurrentTabIndex] = useState(FIRST_INDEX);

  useEffect(() => {
    setCurrentTabIndex(getInitialTabIndex(location.pathname, tabsInfo));
  }, [id]);

  /**
   * Handles click on tab.
   * @param index Tab index.
   */
  const handleTabClick = useCallback((index: number) => () => setCurrentTabIndex(index), []);

  /**
   * Handles key press on tab.
   * @param index Tab index.
   */
  const handleTabPress = useCallback((index: number) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setCurrentTabIndex(index);
    }
  }, []);

  const tabs = tabsInfo.map((tabInfo, index) => (
    <Tab
      as={Link}
      key={tabInfo.name}
      to={`/${entityRootPath}/${id}/${tabInfo.path}`}
      onClick={handleTabClick(index)}
      onKeyPress={handleTabPress(index)}
    >
      {tabInfo.name}
    </Tab>
  ));

  return (
    <nav>
      <Tabs index={currentTabIndex} colorScheme="orange">
        <TabList overflowX="auto">
          {tabs}
        </TabList>
      </Tabs>
    </nav>
  );
};

export const EntityTabs = memo(EntityTabsComponent);
