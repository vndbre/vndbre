'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import clsx from 'clsx';
import type { FC, ForwardedRef } from 'react';
import { forwardRef, memo } from 'react';
import { inter } from 'src/pages/_app';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;

type PopoverContentProps = RadixPopover.PopperContentProps;

/**
 * Popover content component.
 * @param ref Forwarded ref.
 */
export const PopoverContentComponent: FC<PopoverContentProps> =
  ({ children, className, ...props }, ref: ForwardedRef<HTMLDivElement>) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={16}
        {...props}
        ref={ref}
        className={clsx('rounded-md border border-gray-100 bg-white font-sans shadow-lg', inter.variable, className)}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );

export const PopoverContent = memo(forwardRef(PopoverContentComponent));
