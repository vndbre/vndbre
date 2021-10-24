import React, { FC, memo } from 'react';
import { novelTabsInfo } from '../../utils/constants';
import { NovelTab } from '../NovelTab/NovelTab';
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
 * TODO: remove random badges when api requests appear.
 */
export const NovelTabs: FC<NovelTabsProps> = memo(({ id }) => {
  const tabs = novelTabsInfo.map(tabInfo => (
    <li key={tabInfo.path} className={styles.item}>
      <NovelTab
        to={`/vn/${id}${tabInfo.path}`}
        title={tabInfo.name}
        end={!!tabInfo.end}
        badge={Math.random() > 0.5 ? '6' : ''}
      />
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
