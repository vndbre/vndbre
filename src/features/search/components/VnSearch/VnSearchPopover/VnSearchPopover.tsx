import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import { IconButton } from 'src/components/IconButton/IconButton';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/Popover/Popover';
import { useToggle } from 'src/hooks/useToggle';

const VnSearchPopoverComponent: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, toggle] = useToggle();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton intent="tertiary" name="options" className="shrink-0" />
      </PopoverTrigger>
      <PopoverContent className="w-[560px] px-8 py-7">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export const VnSearchPopover = memo(VnSearchPopoverComponent);
