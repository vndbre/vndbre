import type { FC, ReactElement } from 'react';
import { cloneElement, useMemo, useId, memo } from 'react';

import { Label } from '../Label/Label';

interface Props {

  /** Control element. */
  readonly children: ReactElement;

  /** Label for control. */
  readonly label?: string;
}

/** Control wrapper. */
const ControlWrapperComponent: FC<Props> = ({
  label,
  children,
}) => {
  const controlId = useId();
  const control = useMemo(() => cloneElement(children, { id: controlId }), [children]);

  return (
    <div role="group" className="flex flex-col gap-2">
      { label && <Label htmlFor={controlId}>{label}</Label> }
      { control }
    </div>
  );
};

export const ControlWrapper = memo(ControlWrapperComponent);
