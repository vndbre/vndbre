import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { FormControlProps } from 'src/utils/FormControlProps';
import type { StrictOmit } from 'src/api/utils/strictOmit';
import type { SliderProps } from '../Slider/Slider';
import { Slider } from '../Slider/Slider';

type Props<T extends FieldValues> = StrictOmit<SliderProps, 'name'> & FormControlProps<T>;

/** Wrapper for slider to work with forms. */
export const FormSlider = <T extends FieldValues>({
  control,
  rules,
  name,
  ...props
}: Props<T>): JSX.Element => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <Slider {...props} {...field} />
  );
};
