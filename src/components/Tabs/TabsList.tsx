'use client';

import type { MouseEventHandler, ForwardedRef } from 'react';
import { useState, forwardRef, memo } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';

export type TabsListProps = RadixTabs.TabsListProps;

/**
 * Contains tabs.
 * @param ref Forwarded ref.
 */
const TabsListComponent = ({
  className,
  children,
  ...props
}: TabsListProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [overlayX, setOverlayX] = useState<null | number>(0);
  const [overlayWidth, setOverlayWidth] = useState(0);

  // Used to check if tab was hovered by moving cursor from outside or from another tab.
  const [hoverCount, setHoverCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  /**
   * Handle tabs hover to move hover overlay.
   * @param event Mouse event.
   */
  const handleTabsPointerOver: MouseEventHandler<HTMLDivElement> = event => {
    const target = (event.target as HTMLButtonElement);

    if (target.disabled || 'disabled' in target.dataset) {
      setIsHovering(false);
      return;
    }
    if (target.getAttribute('role') === 'tab') {
      setHoverCount(v => v + 1);
      setIsHovering(true);
      setOverlayX(target.offsetLeft);
      setOverlayWidth(target.clientWidth);
    }
  };

  /**
   * Handle tabs hover to hide hover overlay.
   * @param event Mouse event.
   */
  const handleTabsPointerLeave: MouseEventHandler<HTMLDivElement> = () => {
    setHoverCount(0);
    setIsHovering(false);
  };

  return (
    <RadixTabs.List
      ref={ref}
      {...props}
      className={cn('group relative flex w-full overflow-x-auto', className)}
      onPointerOver={handleTabsPointerOver}
      onPointerLeave={handleTabsPointerLeave}
    >
      {children}
      <div className="absolute bottom-0 left-0 -z-10 w-full border-b border-border" />
      <div
        className={cn(
          'absolute left-0 top-0 -z-10 h-10 rounded-sm bg-surface-overlay opacity-0 group-hover:opacity-100', {
            'transition-opacity': hoverCount === 1,
            'transition-all': hoverCount > 1,
          },
        )}
        style={{
          transform: `translateX(${overlayX}px)`,
          width: `${overlayWidth}px`,
          opacity: isHovering ? 1 : 0,
        }}
      />
    </RadixTabs.List>
  );
};
TabsListComponent.displayName = 'TabsList';

export const TabsList = memo(forwardRef(TabsListComponent));
