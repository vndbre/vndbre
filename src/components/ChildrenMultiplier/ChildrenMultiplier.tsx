import type { FC, PropsWithChildren } from 'react';
import { memo, Fragment } from 'react';

interface Props {

  /** Multiplier. */
  readonly amount: number;
}

/** Component renders children * multiplier times. */
const ChildrenMultiplierComponent: FC<PropsWithChildren<Props>> = ({ amount, children }) => {
  const items = [...Array(amount).keys()].map(i => <Fragment key={i}>{children}</Fragment>);

  return (
    <>
      {items}
    </>
  );
};

export const ChildrenMultiplier = memo(ChildrenMultiplierComponent);
