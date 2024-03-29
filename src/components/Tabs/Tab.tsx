'use client';

import type { ElementType } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { memo } from 'react';
import clsx from 'clsx';
import type { PolymorphicProps } from 'src/types/polymorphicProps';

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
  as,
  children,
  className,
  isDisabled,
  value,
  ...props
}: TabProps<C>): JSX.Element => {
  const Component = as ?? 'button';

  return (
    <RadixTabs.Trigger
      {...props}
      value={value}
      className={clsx('group flex flex-col items-stretch gap-1.5 outline-none', className)}
      disabled={isDisabled}
      {...(isDisabled ? { 'data-disabled': true } : {})}
      asChild
    >
      <Component>
        <div className="border-primary outline-focus-inside hover:bg-surface-overlay group-data-[disabled]:text-on-surface-dim pointer-events-none rounded px-3 py-2 leading-6 group-focus-visible:outline group-data-[disabled]:bg-transparent">
          {children}
        </div>
        <div className="group-data-[state=active]:border-primary pointer-events-none mx-3 border-b-2 border-transparent" />
      </Component>
    </RadixTabs.Trigger>
  );
};

export const Tab = memo(TabComponent);
