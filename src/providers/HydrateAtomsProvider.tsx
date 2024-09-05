'use client';

import { useHydrateAtoms } from 'jotai/utils';
import type { FC, PropsWithChildren } from 'react';
import type { Settings } from '@/api/models/settings/settings';
import { isMobileAtom } from '@/store/isMobileAtom';
import { settingsAtom } from '@/store/settingsAtom';

interface Props {

  /** Values to hydrate.  */
  readonly values: {

    /** Settings. */
    readonly settings: Settings;

    /** Whether app is launched on mobile device. */
    readonly isMobile: boolean;
  };
}

/** Hydrates atoms. */
export const HydrateAtomsProvider: FC<PropsWithChildren<Props>> = ({ values, children }) => {
  useHydrateAtoms([[settingsAtom, values.settings], [isMobileAtom, values.isMobile]]);
  return <>{children}</>;
};
