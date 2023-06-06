import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';

interface Props {

  /** `for` attribute. */
  readonly htmlFor: string;
}

/** Label. */
const LabelComponent: FC<PropsWithChildren<Props>> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-caption-18 font-medium">{children}</label>
);

export const Label = memo(LabelComponent);
