import React, { FC } from 'react';
import { Heading } from '@chakra-ui/react';

import cls from './OverviewPage.module.css';

/**
 * Overview tab page.
 */
export const OverviewPage: FC = () => (
  <div className={cls['overview-page']}>
    <div className={cls['overview-sidebar']}>
      <div className={cls['overview-tag-block']}>
        <Heading as="h3" size="sm">Developer</Heading>
      </div>
    </div>
  </div>
);
