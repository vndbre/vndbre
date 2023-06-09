'use client';

import { cn } from '@/utils/cn';
import * as RadixPopover from '@radix-ui/react-popover';
import type { ForwardedRef } from 'react';
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
export const PopoverContentComponent =
  ({ children, className, offset = 'md', ...props }: PopoverContentProps, ref: ForwardedRef<HTMLDivElement>) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={offsets[offset]}
        {...props}
        ref={ref}
        className={cn('z-20 rounded-2xl border border-border bg-surface-1 p-6 font-sans shadow-lg max-md:w-[calc(var(--radix-popper-available-width)-24px)]', className)}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );

export const PopoverContent = memo(forwardRef(PopoverContentComponent));
