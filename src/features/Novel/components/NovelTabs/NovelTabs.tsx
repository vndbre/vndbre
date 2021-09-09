import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { novelTabsInfo } from '../../utils/constants';
import styles from './NovelTabs.module.css';

/**
 * Props of NovelTabs component.
 */
interface NovelTabsProps {

  /**
   * Id of visual novel.
   */
  id: string;
}

/**
 * Component for navigation between tabs on visual novel page.
 */
export const NovelTabs: FC<NovelTabsProps> = memo(({ id }) => {
  /**
   * Computes classes for NavLink component.
   * @param isActive Whether NavLink is selected or not.
   */
  const getNavLinkClassName = (isActive: boolean): string =>
    (isActive ? `${styles.link} ${styles.active}` : styles.link);

  const tabs = novelTabsInfo.map(tabInfo => (
    <li className={styles.item}>
      <NavLink
        to={`/vn/${id}${tabInfo.path}`}
        title={tabInfo.name}
        className={({ isActive }) => getNavLinkClassName(isActive)}
        end={!!tabInfo.end}
      >
        {tabInfo.name}
      </NavLink>
    </li>
  ));

  return (
    <nav>
      <ul className={styles.list}>
        {tabs}
      </ul>
    </nav>
  );
});
