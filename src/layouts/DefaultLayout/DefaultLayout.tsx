import React, { VFC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import cls from './DefaultLayout.module.css';

/**
 * Default layout with sidebar and header.
 */
export const DefaultLayout: VFC = () => (
  <div className={cls.layout}>
    <div className={cls.sidebar}>
      <Sidebar />
    </div>
    <div className={cls.content}>
      <Header />
      <Outlet />
    </div>
  </div>
);
