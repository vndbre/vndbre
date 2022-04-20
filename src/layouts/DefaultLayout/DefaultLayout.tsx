import React, { Suspense, useCallback, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { KEY_IS_SIDEBAR_VISIBLE } from '../../utils/localStorageKeys';
import { useLocalStorage } from '../../hooks';
import cls from './DefaultLayout.module.css';
import { Loading } from '../../components';

/**
 * Default layout with sidebar and header.
 */
export const DefaultLayout: VFC = () => {
  const [isSidebarVisible, setSidebarVisibility] = useLocalStorage(KEY_IS_SIDEBAR_VISIBLE, true);

  const showSidebar = useCallback(() => setSidebarVisibility(true), []);
  const hideSidebar = useCallback(() => setSidebarVisibility(false), []);

  return (
    <Box className={cls.layout}>
      {isSidebarVisible && (
        <Box className={cls.sidebar}>
          <Sidebar onSidebarHide={hideSidebar} />
        </Box>
      )}
      <Box className={`${cls.container} ${isSidebarVisible ? cls['with-sidebar'] : ''}`}>
        <Header isLogoVisible={!isSidebarVisible} onSidebarShow={showSidebar} />
        <Box className={cls.content}>
          <Suspense fallback={<Loading isLoading />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};
