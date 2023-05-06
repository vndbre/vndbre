'use client';

import type { FC } from 'react';
import { memo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

export type TabsContentProps = RadixTabs.TabsContentProps;

/** Tabs content. */
const TabsContentComponent: FC<TabsContentProps> = ({
  children,
  ...props
}) => (
  <RadixTabs.Content {...props}>
    {children}
  </RadixTabs.Content>
);

export const TabsContent = memo(TabsContentComponent);
