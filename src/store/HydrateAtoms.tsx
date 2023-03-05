import { useHydrateAtoms } from 'jotai/utils';
import type { FC, PropsWithChildren } from 'react';

interface Props {

  /** Tuple of [atom, value].  */
  readonly values: Parameters<typeof useHydrateAtoms>['0'];
}

/** Hydrates atoms. */
export const HydrateAtoms: FC<PropsWithChildren<Props>> = ({ values, children }) => {
  useHydrateAtoms(values);
  return <>{children}</>;
};
