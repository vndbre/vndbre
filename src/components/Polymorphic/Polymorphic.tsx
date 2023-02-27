import type { ComponentProps, ElementType } from 'react';
import React, { memo } from 'react';

export type PolymorphicProps<C extends ElementType> = {
  readonly as: C;
}
& ComponentProps<C>;

/** Polymorphic component. */
const PolymorphicComponent = <C extends ElementType>({
  as: Component, ...props
}: PolymorphicProps<C>): JSX.Element => (
  <Component {...props} />
);

export const Polymorphic = memo(PolymorphicComponent);
