import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '@chakra-ui/react';
import styles from './NovelTab.module.css';

/**
 * Props for NovelTab component.
 */
interface NovelTabProps {

  /**
   * Tab link path.
   */
  to: string;

  /**
   * Tab's name.
   */
  title: string;

  /**
   * Is path of the tab is complete or not.
   */
  end: boolean;

  /**
   * Text of optional badge.
   */
  badge?: string;
}

export const NovelTab: FC<NovelTabProps> = memo(({ to, title, end, badge }) => {
  /**
   * Computes classes for NavLink component.
   * @param isActive Whether NavLink is selected or not.
   */
  const getNavLinkClassNames = (isActive: boolean): string => {
    const classNames = [styles.link];

    if (isActive) {
      classNames.push(styles.active);
    }

    if (badge) {
      classNames.push(styles.badge);
    }

    return classNames.join(' ');
  };

  const badgeElement = badge ? (
    <Badge verticalAlign="top">{badge}</Badge>
  ) : null;

  return (
    <NavLink
      to={to}
      title={title}
      end={end}
      className={({ isActive }) => getNavLinkClassNames(isActive)}
    >
      <span title={title} className={styles.text}>{title}</span>
      {badgeElement}
    </NavLink>
  );
});
