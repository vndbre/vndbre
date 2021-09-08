import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NovelTabs.module.css';

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
export const NovelTabs: FC<NovelTabsProps> = ({ id }) => (
  <nav>
    <ul className={styles.list}>
      <li>
        <NavLink
          to={`/vn/${id}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          end
        >
          Overview
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/vn/${id}/releases`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Releases
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/vn/${id}/characters`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Characters
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/vn/${id}/relations`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Relations
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/vn/${id}/discussions`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Discussions
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/vn/${id}/media`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Media
        </NavLink>
      </li>
    </ul>
  </nav>
);
