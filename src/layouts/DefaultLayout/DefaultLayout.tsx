import React, { ReactNode, Suspense, useCallback, useMemo, useState, VFC } from 'react';
import { Box, Drawer, DrawerContent, DrawerOverlay, Slide, useDisclosure, SystemStyleObject } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { KEY_IS_SIDEBAR_VISIBLE } from '../../utils/localStorageKeys';
import { useLocalStorage } from '../../hooks';
import { Loading } from '../../components';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useFloatingHeader } from '../hooks/useFloatingHeader';

const SIDEBAR_VISIBLE_CONTENT_SX = { paddingLeft: 60 };
const SIDEBAR_VISIBLE_HEADER_SX = { transform: 'translateX(calc(-1 * var(--chakra-sizes-60)))' };

/**
 * Default layout with sidebar and header.
 */
export const DefaultLayout: VFC = () => {
  const isFloatingHeaderVisible = useFloatingHeader();

  const [isDesktopSidebarVisible, setDesktopSidebarVisibility] = useLocalStorage(KEY_IS_SIDEBAR_VISIBLE, true);
  const [isDesktopHeaderButtonVisible, setDesktopHeaderButtonVisibility] = useState(!isDesktopSidebarVisible);

  const [desktopSidebarSx, setDesktopSidebarSx] = useState<SystemStyleObject>({});
  const [desktopContainerSx, setDesktopContainerSx] =
    useState<SystemStyleObject>(isDesktopSidebarVisible ? SIDEBAR_VISIBLE_CONTENT_SX : {});

  const handleDesktopSidebarShow = useCallback(() => {
    setDesktopSidebarSx(SIDEBAR_VISIBLE_HEADER_SX);
    setDesktopContainerSx(SIDEBAR_VISIBLE_CONTENT_SX);
    setDesktopSidebarVisibility(true);
    setDesktopHeaderButtonVisibility(false);
    setTimeout(() => setDesktopSidebarSx({}), 0);
  }, []);

  const handleDesktopSidebarHide = useCallback(() => {
    setDesktopContainerSx({});
    setDesktopHeaderButtonVisibility(true);
    setTimeout(() => setDesktopSidebarSx(SIDEBAR_VISIBLE_HEADER_SX), 0);
    setTimeout(() => {
      setDesktopSidebarVisibility(false);
      setDesktopSidebarSx({});
    }, 400);
  }, []);

  const {
    isOpen: isMobileSidebarOpen,
    onOpen: handleMobileSidebarOpen,
    onClose: handleMobileSidebarClose,
  } = useDisclosure();

  const isMobile = useIsMobile();

  const isHeaderButtonVisible = useMemo(() => (isMobile ? true : isDesktopHeaderButtonVisible), [isMobile, isDesktopHeaderButtonVisible]);
  const handleSidebarShow = useCallback(isMobile ? handleMobileSidebarOpen : handleDesktopSidebarShow, [isMobile]);
  const contentSx = useMemo(() => (isMobile ? {} : desktopContainerSx), [isMobile, desktopContainerSx]);

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
      <Box
        position="fixed"
        width={60}
        transition="0.3s ease-in-out"
        transform="translateX(0)"
        sx={desktopSidebarSx}
      >
        <Sidebar onSidebarHide={handleDesktopSidebarHide} />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDir="row"
      minH="100vh"
    >
      {getSidebar()}
      <Slide
        direction="top"
        in={isFloatingHeaderVisible}
        style={{
          marginLeft: isHeaderButtonVisible ? '0px' : 'var(--chakra-sizes-60)',
          transition: 'margin 0.3s ease-in-out',
        }}
      >
        <Header isLogoVisible={isHeaderButtonVisible} onSidebarShow={handleSidebarShow} />
      </Slide>
      <Box
        paddingLeft={0}
        marginTop={{
          base: 14,
          md: 16,
        }}
        transition="0.3s ease-in-out"
        maxW="100vw"
        w="full"
        sx={contentSx}
      >
        <Box
          display="flex"
          flexDirection="column"
          maxWidth="var(--screen-max-width)"
          w="full"
          marginX="auto"
          padding={{
            base: 4,
            md: 10,
          }}
        >
          <Suspense fallback={<Loading hasFullHeight isLoading />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};
