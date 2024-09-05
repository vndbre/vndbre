'use client';

import type { ElementType } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { memo } from 'react';
import type { PolymorphicProps } from '@/types/polymorphicProps';
import { cn } from '@/utils/cn';

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
      className={cn('group flex flex-col items-stretch gap-1.5 outline-none', className)}
      disabled={isDisabled}
      {...(isDisabled ? { 'data-disabled': true } : {})}
      asChild
    >
      <Component>
        <div className="outline-focus-inside pointer-events-none rounded border-primary px-3 py-2 leading-6 hover:bg-surface-overlay group-focus-visible:outline group-data-[disabled]:bg-transparent group-data-[disabled]:text-on-surface-dim">
          {children}
        </div>
        <div className="pointer-events-none mx-3 border-b-2 border-transparent group-data-[state=active]:border-primary" />
      </Component>
    </RadixTabs.Trigger>
  );
};

export const Tab = memo(TabComponent);
