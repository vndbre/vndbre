import type { ComponentProps, ElementType } from 'react';
import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

import type { FormControlProps } from 'src/utils/FormControlProps';
import { typedMemo } from 'src/api/utils/typedMemo';

type Props<C extends ElementType, T extends FieldValues> = {
  readonly Component: C;
}
& ComponentProps<C>
& Omit<ComponentProps<C>, 'name'>
& FormControlProps<T>;

/** Polymorphic component that allows component to interact with form. */
const FieldComponent = <T extends ElementType, Values extends FieldValues>({
  Component,
  control,
  name,
  rules,
  ...componentProps
}: Props<T, Values>): JSX.Element => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <Component {...field} {...componentProps} />
  );
};

export const Field = typedMemo(FieldComponent);
