import React, { useCallback, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { LOCAL_STORAGE_SIDEBAR_VISIBILITY } from '../../utils/constants';
import { useLocalStorage } from '../../utils/useLocalStorage';
import cls from './DefaultLayout.module.css';

/**
 * Default layout with sidebar and header.
 */
export const DefaultLayout: VFC = () => {
  const [isSidebarVisible, setSiderbarVisibility] = useLocalStorage(LOCAL_STORAGE_SIDEBAR_VISIBILITY, true);

  const showSidebar = useCallback(() => setSiderbarVisibility(true), []);
  const hideSidebar = useCallback(() => setSiderbarVisibility(false), []);

  return (
    <Box className={cls.layout}>
      {isSidebarVisible && (
        <Box className={cls.sidebar}>
          <Sidebar onSiderbarHide={hideSidebar} />
        </Box>
      )}
      <Box className={`${cls.container} ${isSidebarVisible ? cls['with-sidebar'] : ''}`}>
        <Header isLogoVisible={!isSidebarVisible} onSiderbarShow={showSidebar} />
        <Box className={cls.content}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
