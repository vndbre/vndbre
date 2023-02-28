import { clsx } from 'clsx';
import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { SortOrder } from 'src/api/models/sortOptions';
import { typedMemo } from 'src/api/utils/typedMemo';
import type { FormControlProps } from 'src/utils/FormControlProps';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import { IconButton } from '../IconButton/IconButton';

type Props<T extends FieldValues> = PropsWithClass<FormControlProps<T>>;

/** Component for controlled sort direction input. */
const SortDirectionControlComponent = <T extends FieldValues>({
  control,
  name,
  className,
}: Props<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <IconButton
        className={clsx('rounded-r-none', className)}
        intent="tertiary"
        name={`sort-${value as SortOrder}`}
        onClick={() => onChange(value === 'asc' ? 'desc' : 'asc')}
        size="sm"
      />
    )}
  />
);

export const SortDirectionControl = typedMemo(SortDirectionControlComponent);
