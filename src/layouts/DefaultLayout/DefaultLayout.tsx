import React, { Suspense, useCallback, useState, VFC } from 'react';
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

  const [sidebarClasses, setSidebarClasses] = useState<string[]>([]);
  const [containerClasses, setContainerClasses] = useState<string[]>(isSidebarVisible ? ['with-sidebar'] : []);

  const showSidebar = useCallback(() => {
    setSidebarClasses(['sidebar-hidden']);
    setContainerClasses(['with-sidebar']);
    setSidebarVisibility(true);
    setTimeout(() => setSidebarClasses(['sidebar-visible']), 0);
    setTimeout(() => setSidebarClasses([]), 400);
  }, []);

  const hideSidebar = useCallback(() => {
    setSidebarClasses(['sidebar-visible']);
    setTimeout(() => setSidebarClasses(['sidebar-hidden']), 0);
    setContainerClasses([]);
    setTimeout(() => {
      setSidebarVisibility(false);
      setSidebarClasses([]);
    }, 400);
  }, []);

  return (
    <Box className={cls.layout}>
      {isSidebarVisible && (
        <Box className={[cls.sidebar, sidebarClasses.map(className => cls[className])].join(' ')}>
          <Sidebar onSidebarHide={hideSidebar} />
        </Box>
      )}
      <Box className={`
        ${cls.container}
        ${[containerClasses.map(className => cls[className])].join(' ')}
      `}
      >
        <Header isLogoVisible={!isSidebarVisible} onSidebarShow={showSidebar} />
        <Box className={cls.content}>
          <Suspense fallback={<Loading hasFullHeight isLoading />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};
