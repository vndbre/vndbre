import type { FC } from 'react';
import React, { memo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import clsx from 'clsx';

export type TabsListProps = RadixTabs.TabsListProps;

/** Contains tabs. */
const TabsListComponent: FC<TabsListProps> = ({
  className,
  children,
  ...props
}) => (
  <RadixTabs.List {...props} className={clsx('relative w-full flex overflow-x-auto', className)}>
    <div className="absolute bottom-0 left-0 -z-10 w-full border-b border-gray-200" />
    {children}
  </RadixTabs.List>
);

export const TabsList = memo(TabsListComponent);
