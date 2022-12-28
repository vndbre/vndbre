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
    className={clsx('flex flex-col gap-1.5 items-stretch group', className)}
    disabled={isDisabled}
  >
    <div className="font-sm leading-6 rounded px-3 py-2 hover:bg-gray-200 group-data-[disabled]:bg-transparent group-data-[disabled]:text-gray-400">
      {children}
    </div>
    <div className="mx-3 border-b-2 border-transparent group-data-[state=active]:border-primary-500" />
  </RadixTabs.Trigger>
);

export const Tab = memo(TabComponent);
