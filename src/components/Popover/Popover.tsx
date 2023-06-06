'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import clsx from 'clsx';
import type { FC, ForwardedRef } from 'react';
import { forwardRef, memo } from 'react';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;

const offsets: Record<OffsetSize, number> = {
  xs: 8,
  sm: 16,
  md: 24,
};

/** Offset size. */
export type OffsetSize = 'xs' | 'sm' | 'md';

type PopoverContentProps =
& Omit<
  RadixPopover.PopperContentProps,
  'sideOffset'
>
& {
  readonly offset?: OffsetSize;
};

/**
 * Popover content component.
 * @param ref Forwarded ref.
 */
export const PopoverContentComponent: FC<PopoverContentProps> =
  ({ children, className, offset = 'md', ...props }, ref: ForwardedRef<HTMLDivElement>) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={offsets[offset]}
        {...props}
        ref={ref}
        className={clsx('bg-surface-1 border-border z-20 rounded-2xl border p-6 font-sans shadow-lg max-md:w-[calc(var(--radix-popper-available-width)-24px)]', className)}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );

export const PopoverContent = memo(forwardRef(PopoverContentComponent));
