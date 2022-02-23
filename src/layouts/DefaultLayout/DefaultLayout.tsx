import React, { VFC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useLocalStorage } from '../../utils/useLocalStorage';
import cls from './DefaultLayout.module.css';

/**
 * Default layout with sidebar and header.
 */
export const DefaultLayout: VFC = () => {
  const [isSidebarVisible, serSiderbarVisibility] = useLocalStorage('vndbre:sidebar-visible', true);

  return (
    <div className={cls.layout}>
      {isSidebarVisible && (
        <div className={cls.sidebar}>
          <Sidebar onSiderbarHide={() => serSiderbarVisibility(false)} />
        </div>
      )}
      <div className={`${cls.container} ${isSidebarVisible ? cls['with-sidebar'] : ''}`}>
        <Header showLogo={!isSidebarVisible} onSiderbarShow={() => serSiderbarVisibility(true)} />
        <div className={cls.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
