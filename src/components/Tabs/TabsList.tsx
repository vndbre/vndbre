import type { FC, ForwardedRef } from 'react';
import React, { forwardRef, memo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import clsx from 'clsx';

export type TabsListProps = RadixTabs.TabsListProps;

/**
 * Contains tabs.
 * @param ref Forwarded ref.
 */
const TabsListComponent: FC<TabsListProps> = ({
  className,
  children,
  ...props
}, ref: ForwardedRef<HTMLDivElement>) => (
  <RadixTabs.List ref={ref} {...props} className={clsx('relative flex w-full overflow-x-auto', className)}>
    <div className="absolute bottom-0 left-0 -z-10 w-full border-b border-gray-200" />
    {children}
  </RadixTabs.List>
);
TabsListComponent.displayName = 'TabsList';

export const TabsList = memo(forwardRef(TabsListComponent));
