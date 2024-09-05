'use client';

import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { SortOrder } from '@/api/models/sortOptions';
import { typedMemo } from '@/api/utils/typedMemo';
import type { FormControlProps } from '@/types/formControlProps';
import type { PropsWithClass } from '@/types/propsWithClass';
import { cn } from '@/utils/cn';
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
        className={cn('rounded-r-none', className)}
        intent="tertiary"
        name={`sort-${value as SortOrder}`}
        onClick={() => onChange(value === 'asc' ? 'desc' : 'asc')}
        size="sm"
      />
    )}
  />
);

export const SortDirectionControl = typedMemo(SortDirectionControlComponent);
