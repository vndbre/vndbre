import type { FC, PropsWithChildren } from 'react';
import { memo, Fragment } from 'react';

interface Props {

  /** List size. */
  readonly size: number;
}

/** Component renders children * size times. */
const ListComponent: FC<PropsWithChildren<Props>> = ({ size, children }) => {
  const items = [...Array(size).keys()].map(i => <Fragment key={i}>{children}</Fragment>);

  return (
    <>
      {items}
    </>
  );
};

export const List = memo(ListComponent);
