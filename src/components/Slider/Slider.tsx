import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';
import type { FC, ForwardedRef } from 'react';
import { forwardRef, memo } from 'react';
import type { StrictOmit } from 'src/api/utils/strictOmit';

export type SliderProps =
& StrictOmit<RadixSlider.SliderProps, 'onChange' | 'onValueChange'>
& {
  readonly onChange?: (value: number[]) => void;
  readonly showValues?: boolean;
  readonly label?: string;
};

/**
 * Slider component.
 * @param ref Forwarded ref.
 */
const SliderComponent: FC<SliderProps> = ({
  showValues = false,
  label,
  onChange,
  className,
  value,
  ...props
}, ref: ForwardedRef<HTMLInputElement>) => (
  <div className="flex flex-col gap-2">
    <div className="flex w-full text-sm font-medium leading-6">
      {label !== undefined && <span>{label}</span>}
      {showValues && value !== undefined && (
        <span className="ml-auto text-gray-500">
          {value[0]}
          {' '}
          {value[1] !== undefined && `- ${value[1]}`}
        </span>
      )}
    </div>

    <RadixSlider.Root
      {...props}
      ref={ref}
      value={value}
      onValueChange={onChange}
      className={clsx('relative flex items-center', className)}
    >
      <RadixSlider.Track className="relative h-3 w-full flex-1 rounded-full bg-gray-200">
        <RadixSlider.Range className="bg-primary-300 absolute h-3 rounded-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="bg-primary-600 block h-4 w-4 rounded-full outline-none" />
      <RadixSlider.Thumb className="bg-primary-600 block h-4 w-4 rounded-full outline-none" />
    </RadixSlider.Root>
  </div>
);

SliderComponent.displayName = 'Slider';

export const Slider = memo(forwardRef(SliderComponent));
