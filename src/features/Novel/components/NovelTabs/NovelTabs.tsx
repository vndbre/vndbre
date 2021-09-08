import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NovelTabs.module.css';

const tabNames = [
  'Releases',
  'Characters',
  'Relations',
  'Discussions',
  'Media',
];

/**
 * TODO: add comments.
 */
interface NovelTabsProps {

  /**
   * TODO: add comments.
   */
  id: string;
}

/**
 * TODO: add comments.
 */
export const NovelTabs: FC<NovelTabsProps> = memo(({ id }) => {
  /**
   * TODO: Add comments.
   * @param isActive Da.
   */
  const getNavLinkClassName = (isActive: boolean): string =>
    (isActive ? `${styles.item} ${styles.active}` : styles.item);

  const subroutes = tabNames.map(tabName => (
    <li>
      <NavLink
        to={`/vn/${id}/${tabName.toLowerCase()}`}
        title={tabName}
        className={({ isActive }) => getNavLinkClassName(isActive)}
      >
        {tabName}
      </NavLink>
    </li>
  ));

  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <NavLink
            to={`/vn/${id}`}
            title="Overview"
            className={({ isActive }) => getNavLinkClassName(isActive)}
            end
          >
            Overview
          </NavLink>
        </li>
        {subroutes}
      </ul>
    </nav>
  );
});
