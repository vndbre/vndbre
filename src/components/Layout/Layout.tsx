import type { FC } from 'react';

import type { PropsWithChildrenAndClass } from '@/types/propsWithClass';
import { cn } from '@/utils/cn';
import { AppHeader } from '../AppHeader/AppHeader';

/** Default layout. */
export const Layout: FC<PropsWithChildrenAndClass> = ({ className, children }) => (
  <div className={cn('flex flex-col items-center gap-6', className)}>
    <AppHeader />
    <div className="w-full max-w-screen-xl px-6">
      {children}
    </div>
  </div>
);
