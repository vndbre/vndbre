import type { ComponentProps, ElementType } from 'react';
import React, { memo } from 'react';

interface AsProps<C extends ElementType> {

  /** Component. */
  readonly as?: C;
}

export type PolymorphicProps<C extends ElementType> =
& AsProps<C>
& Omit<ComponentProps<C>, keyof AsProps<C>>;

/** Polymorphic component. */
const PolymorphicComponent = <C extends ElementType>({
  as,
  ...props
}: PolymorphicProps<C>): JSX.Element => {
  const Component = as ?? 'div';
  return (
    <Component {...props} />
  );
};

export const Polymorphic = memo(PolymorphicComponent);
