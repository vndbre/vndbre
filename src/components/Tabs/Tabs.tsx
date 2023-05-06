'use client';

import type { FC } from 'react';
import { memo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

export type TabsProps = Omit<RadixTabs.TabsProps, 'orientation'>;

/**
 * Tabs root.
 *
 * Docs: https://www.radix-ui.com/docs/primitives/components/tabs.
 */
const TabsComponent: FC<TabsProps> = ({
  children,
  ...props
}) => (
  <RadixTabs.Root {...props}>
    {children}
  </RadixTabs.Root>
);

export const Tabs = memo(TabsComponent);
