import type { FC, PropsWithChildren } from 'react';
import React, { memo } from 'react';

interface Props {

  /** `for` attribute. */
  readonly htmlFor: string;
}

/** Label. */
const LabelComponent: FC<PropsWithChildren<Props>> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium leading-6">{children}</label>
);

export const Label = memo(LabelComponent);
