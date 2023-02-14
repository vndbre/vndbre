/* eslint-disable jsdoc/require-jsdoc */
import type { ComponentProps, ElementType } from 'react';
import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

import type { FormControlProps } from 'src/utils/FormControlProps';

type Props<C extends ElementType, T extends FieldValues> = {
  readonly Component: C;

} & ComponentProps<C> & Omit<ComponentProps<C>, 'name'> & FormControlProps<T>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Field = <T extends ElementType, Values extends FieldValues>({
  Component,
  control,
  name,
  rules,
  ...componentProps
}: Props<T, Values>) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <Component {...field} {...componentProps} />
  );
};
