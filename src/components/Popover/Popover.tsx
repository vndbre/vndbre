import * as RadixPopover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { inter } from 'src/pages/_app';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;

type PopoverContentProps = RadixPopover.PopperContentProps;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={5}
        {...props}
        ref={forwardedRef}
        className={clsx('rounded border border-gray-200 bg-white font-sans shadow-2xl', inter.variable, className)}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  ),
);

PopoverContent.displayName = 'PopoverContent';
