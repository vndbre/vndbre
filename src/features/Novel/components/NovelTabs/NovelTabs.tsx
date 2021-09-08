import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NovelTabs.module.css';

const tabNames = [
  'Overview',
  'Releases',
  'Characters',
  'Relations',
  'Discussions',
  'Media',
];

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
    (isActive ? `${styles.item} ${styles.active}` : styles.item);

  const tabs = tabNames.map(tabName => (
    <li>
      <NavLink
        to={`/vn/${id}/${tabName === 'Overview' ? '' : tabName.toLowerCase()}`}
        title={tabName}
        className={({ isActive }) => getNavLinkClassName(isActive)}
        end={tabName === 'Overview'}
      >
        {tabName}
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
