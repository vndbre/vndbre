import type { FC } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import React, { memo } from 'react';
import clsx from 'clsx';

/** Tab props. */
export interface TabProps extends Omit<RadixTabs.TabsTriggerProps, 'disabled'> {

  /** Is tab disabled. */
  readonly isDisabled?: boolean;
}

/** Tab. */
const TabComponent: FC<TabProps> = ({
  children,
  className,
  isDisabled,
  ...props
}) => (
  <RadixTabs.Trigger
    {...props}
    className={clsx('group flex flex-col items-stretch gap-1.5', className)}
    disabled={isDisabled}
  >
    <div className="border-primary-500 rounded px-3 py-2 leading-6 hover:bg-gray-200 group-data-[disabled]:bg-transparent group-data-[disabled]:text-gray-400">
      {children}
    </div>
    <div className="group-data-[state=active]:border-primary-500 border-primary-500  mx-3 border-b-2 border-transparent" />
  </RadixTabs.Trigger>
);

export const Tab = memo(TabComponent);
