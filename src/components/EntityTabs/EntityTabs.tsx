import React, { VFC, memo, useState, useEffect } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RouteInfo } from '../../routes/utils/RouteInfo';

interface Props {

  /** Id of entity.*/
  readonly id: string;

  /** List of tabs. */
  readonly tabsInfo: RouteInfo[];

  /** Entity root path. Example: `vn`. */
  readonly entityRootPath: string;
}

const FIRST_INDEX = 0;

/**
 * Component for navigation on entity page page.
 */
export const EntityTabsComponent: VFC<Props> = ({ id, tabsInfo, entityRootPath }) => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(FIRST_INDEX);

  /**
   * Calculates initial index for tabs based on route.
   * @param pathname URL pathname.
   */
  const getInitialTabIndex = (pathname: string): number => {
    const splitPath = pathname.split('/');
    const activeRoute = splitPath[splitPath.length - 1];
    const tabIndx = tabsInfo.findIndex(tabInfo => tabInfo.path === activeRoute);
    return tabIndx >= FIRST_INDEX ? tabIndx : FIRST_INDEX;
  };

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

  const tabs = tabsInfo.map((tabInfo, index) => (
    <Tab
      as={Link}
      key={tabInfo.name}
      to={`/${entityRootPath}/${id}/${tabInfo.path}`}
      onClick={onTabClick(index)}
      onKeyPress={onTabPress(index)}
    >
      {tabInfo.name}
    </Tab>
  ));

  return (
    <nav>
      <Tabs index={tabIndex} colorScheme="orange">
        <TabList px="10">
          {tabs}
        </TabList>
      </Tabs>
    </nav>
  );
};

export const EntityTabs = memo(EntityTabsComponent);
