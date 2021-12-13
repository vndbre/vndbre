import React, { memo, VFC } from 'react';
import { Icon } from '../Icon/Icon';
import cls from './Header.module.css';

/**
 * TODO: Implement header funtionality.
 */
export const Header: VFC = memo(() => (
  <header className={cls.header}>
    <div className={cls.search}>
      <Icon name="carbon:search" />
      <span>Search</span>
    </div>
    <div className={cls.profile}>
      <Icon name="carbon:user-avatar" size={32} />
      <span> Profile</span>
    </div>
    <Icon name="carbon:notification" size={32} />
    <Icon name="carbon:add" size={36} />
  </header>
));
