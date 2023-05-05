'use client';

import { useHydrateAtoms } from 'jotai/utils';
import type { FC, PropsWithChildren } from 'react';
import type { Settings } from 'src/api/models/settings/settings';
import { isMobileAtom } from 'src/store/isMobileAtom';
import { settingsAtom } from 'src/store/settingsAtom';

interface Props {

  /** Tuple of [atom, value].  */
  readonly values: {
    readonly settings: Settings;
    readonly isMobile: boolean;
  };
}

/** Hydrates atoms. */
export const HydrateAtomsProvider: FC<PropsWithChildren<Props>> = ({ values, children }) => {
  useHydrateAtoms([[settingsAtom, values.settings], [isMobileAtom, values.isMobile]]);
  return <>{children}</>;
};
