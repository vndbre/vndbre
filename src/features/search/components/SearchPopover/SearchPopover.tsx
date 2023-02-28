import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import { IconButton } from 'src/components/IconButton/IconButton';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/Popover/Popover';

/** Popover for vn search. */
const SearchPopoverComponent: FC<PropsWithChildren> = ({ children }) => (
  <Popover>
    <PopoverTrigger asChild>
      <IconButton intent="tertiary" name="options" className="shrink-0" />
    </PopoverTrigger>
    <PopoverContent align="end" className="w-[calc(var(--radix-popper-available-width)-24px)] p-4 md:w-[320px]">
      {children}
    </PopoverContent>
  </Popover>
);

export const SearchPopover = memo(SearchPopoverComponent);
