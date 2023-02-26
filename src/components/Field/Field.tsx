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
  ...componentProps
}: Props<T, Values>): JSX.Element => {
  const { field, fieldState: { error } } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-col gap-2">
      <Component {...field} {...componentProps} />
      {error && <span className="text-sm leading-5 text-red-500">{error.message}</span>}
    </div>
  );
};

export const Field = typedMemo(FieldComponent);
