import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import { IconButton } from 'src/components/IconButton/IconButton';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/Popover/Popover';

/** Popover for vn search. */
const VnSearchPopoverComponent: FC<PropsWithChildren> = ({ children }) => (
  <Popover>
    <PopoverTrigger asChild>
      <IconButton intent="tertiary" name="options" className="shrink-0" />
    </PopoverTrigger>
    <PopoverContent align="end" className="max-w-[560px] px-8 py-7">
      {children}
    </PopoverContent>
  </Popover>
);

export const VnSearchPopover = memo(VnSearchPopoverComponent);
