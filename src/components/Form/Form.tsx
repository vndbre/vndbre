'use client';

import type { PropsWithChildrenAndClass } from 'src/utils/PropsWithClass';
import { FormProvider } from 'react-hook-form';
import type { FormProviderProps, FieldValues, SubmitHandler } from 'react-hook-form';

interface Props<T extends FieldValues> extends FormProviderProps<T> {

  /** Submit handler. */
  readonly onSubmit?: SubmitHandler<T>;
}

/** Form component. */
export const Form = <T extends FieldValues>({
  children,
  className,
  onSubmit,
  ...methods
}: PropsWithChildrenAndClass<Props<T>>): JSX.Element => {
  const handleSubmit = onSubmit !== undefined ? methods.handleSubmit(onSubmit) : undefined;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
