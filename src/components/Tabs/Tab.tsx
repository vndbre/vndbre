import type { ElementType } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import React, { memo } from 'react';
import clsx from 'clsx';
import type { PolymorphicProps } from '../Polymorphic/Polymorphic';

/** Tab props. */
export type TabProps<C extends ElementType> =
& PolymorphicProps<C>
& Omit<RadixTabs.TabsTriggerProps, 'disabled'>
& {

  /** Is tab disabled. */
  readonly isDisabled?: boolean;
};

/** Tab. */
const TabComponent = <C extends ElementType>({
  as: Component,
  children,
  className,
  isDisabled,
  value,
  ...props
}: TabProps<C>): JSX.Element => (
  <RadixTabs.Trigger
    {...props}
    value={value}
    className={clsx('group flex flex-col items-stretch gap-1.5 outline-none', className)}
    disabled={isDisabled}
    dataDisabled={isDisabled}
    asChild
  >
    <Component>
      <div className="border-primary-500 outline-focus-inside pointer-events-none rounded px-3 py-2 leading-6 hover:bg-gray-200 group-focus-visible:outline group-data-[disabled]:bg-transparent group-data-[disabled]:text-gray-400">
        {children}
      </div>
      <div className="group-data-[state=active]:border-primary-500 border-primary-500 pointer-events-none  mx-3 border-b-2 border-transparent" />
    </Component>
  </RadixTabs.Trigger>
);

export const Tab = memo(TabComponent);
