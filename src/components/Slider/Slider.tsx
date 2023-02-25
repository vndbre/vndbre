import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';
import type { FC, ForwardedRef } from 'react';
import { forwardRef, memo } from 'react';
import type { StrictOmit } from 'src/api/utils/strictOmit';
import { ChildrenMultiplier } from '../ChildrenMultiplier/ChildrenMultiplier';

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
  <div className="flex flex-col gap-1">
    <div className="flex w-full items-center">
      {label !== undefined && <span className="text-caption-18 font-medium">{label}</span>}
      {showValues && value !== undefined && (
        <span className="text-caption-16 ml-auto text-gray-500">
          {value[0]}
          {value[1] !== undefined && `-${value[1]}`}
        </span>
      )}
    </div>

    <RadixSlider.Root
      {...props}
      ref={ref}
      value={value}
      onValueChange={onChange}
      className={clsx('relative flex h-4 items-center', className)}
    >
      <RadixSlider.Track className="relative h-2 w-full flex-1 cursor-pointer rounded-full bg-gray-200">
        <RadixSlider.Range className="bg-primary-400 absolute h-2 rounded-full" />
      </RadixSlider.Track>
      <ChildrenMultiplier amount={2}>
        <RadixSlider.Thumb className="bg-primary-400 block h-4 w-8 cursor-grab rounded-full outline-none active:cursor-grabbing" />
      </ChildrenMultiplier>
    </RadixSlider.Root>
  </div>
);

SliderComponent.displayName = 'Slider';

export const Slider = memo(forwardRef(SliderComponent));
