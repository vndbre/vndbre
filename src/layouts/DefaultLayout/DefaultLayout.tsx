import React, { ReactNode, Suspense, useCallback, useMemo, useState, VFC } from 'react';
import { Box, Drawer, DrawerContent, DrawerOverlay, Slide, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { KEY_IS_SIDEBAR_VISIBLE } from '../../utils/localStorageKeys';
import { useLocalStorage } from '../../hooks';
import cls from './DefaultLayout.module.css';
import { Loading } from '../../components';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useFloatingHeader } from '../hooks/useFloatingHeader';

/**
 * Default layout with sidebar and header.
 */
export const DefaultLayout: VFC = () => {
  const [isDesktopSidebarVisible, setDesktopSidebarVisibility] = useLocalStorage(KEY_IS_SIDEBAR_VISIBLE, true);
  const [isHeaderButtonVisible, setHeaderButtonVisibility] = useState(!isDesktopSidebarVisible);

  const [desktopSidebarClasses, setDesktopSidebarClasses] = useState<string[]>([]);
  const [desktopContainerClasses, setDesktopContainerClasses] = useState<string[]>(isDesktopSidebarVisible ? ['with-sidebar'] : []);

  const handleDesktopSidebarShow = useCallback(() => {
    setDesktopSidebarClasses(['sidebar-hidden']);
    setDesktopContainerClasses(['with-sidebar']);
    setDesktopSidebarVisibility(true);
    setHeaderButtonVisibility(false);
    setTimeout(() => setDesktopSidebarClasses(['sidebar-visible']), 0);
    setTimeout(() => setDesktopSidebarClasses([]), 400);
  }, []);

  const handleDesktopSidebarHide = useCallback(() => {
    setDesktopSidebarClasses(['sidebar-visible']);
    setTimeout(() => setDesktopSidebarClasses(['sidebar-hidden']), 0);
    setDesktopContainerClasses([]);
    setHeaderButtonVisibility(true);
    setTimeout(() => {
      setDesktopSidebarVisibility(false);
      setDesktopSidebarClasses([]);
    }, 400);
  }, []);

  const isMobile = useIsMobile();
  const {
    isOpen: isMobileSidebarOpen,
    onOpen: handleMobileSidebarOpen,
    onClose: handleMobileSidebarClose,
  } = useDisclosure();

  // const isHeaderButtonVisible = useMemo(() => (isMobile ? true : !isDesktopSidebarVisible), [isMobile, isDesktopSidebarVisible]);
  const handleSidebarShow = useCallback(isMobile ? handleMobileSidebarOpen : handleDesktopSidebarShow, [isMobile]);
  const containerClasses = useMemo(() => (isMobile ? [] : desktopContainerClasses), [isMobile, desktopContainerClasses]);

  /** Returns mobile or desktop sidebar. */
  function getSidebar(): ReactNode {
    if (isMobile) {
      return (
        <Drawer
          isOpen={isMobileSidebarOpen}
          placement="left"
          onClose={handleMobileSidebarClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar onSidebarHide={handleMobileSidebarClose} />
          </DrawerContent>
        </Drawer>
      );
    }
    return isDesktopSidebarVisible && (
      <Box className={[cls.sidebar, desktopSidebarClasses.map(className => cls[className])].join(' ')}>
        <Sidebar onSidebarHide={handleDesktopSidebarHide} />
      </Box>
    );
  }

  const isFloatingHeaderVisible = useFloatingHeader();

  return (
    <Box className={cls.layout}>
      {getSidebar()}
      <Box className={`
        ${[cls.container, containerClasses.map(className => cls[className])].join(' ')}
      `}
      >
        {/* <Header isLogoVisible={isHeaderButtonVisible} onSidebarShow={handleSidebarShow} /> */}
        <Slide
          direction="top"
          in={isFloatingHeaderVisible}
          style={{ zIndex: 10, marginLeft: isHeaderButtonVisible ? '0px' : 'var(--chakra-sizes-60)', transition: '0.3s linear' }}
        >
          <Header isLogoVisible={isHeaderButtonVisible} onSidebarShow={handleSidebarShow} />
        </Slide>
        <Box className={cls.content}>
          <Suspense fallback={<Loading hasFullHeight isLoading />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};
