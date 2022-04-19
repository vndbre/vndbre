import React, { memo, useMemo, VFC } from 'react';
import {
  FormControl,
  FormLabel,
  RangeSlider as ChakraRangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  HStack,
  Text,
  Tooltip,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FormControlProps } from '../../utils/formControl';

interface Props extends FormControlProps {

  /** Label for the range slider. */
  readonly label: string;

  /** The minimum possible value of the slider. Must not be greater than max. */
  readonly min: number;

  /** The maximum possible value of the slider. Must not be less than min. */
  readonly max: number;

  /** Function for generating custom label based on range slider value.  */
  readonly labelRenderer?: (sliderValue: number) => string;
}

/**
 * Custom range slider based on Chakra UI `RangeSlider` component.
 */
const RangeSliderComponent: VFC<Props> = ({
  control,
  name,
  label,
  rules,
  min,
  max,
  labelRenderer,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, error },
  } = useController<Record<string, [number, number]>>({
    name,
    control,
    rules,
  });

  const minValueLabel = useMemo(() => (labelRenderer != null ? labelRenderer(value[0]) : value[0]), [value[0]]);
  const maxValueLabel = useMemo(() => (labelRenderer != null ? labelRenderer(value[1]) : value[1]), [value[1]]);

  return (
    <FormControl isInvalid={invalid} id={name}>
      <HStack justifyContent="space-between">
        <FormLabel>{label}</FormLabel>
        <Text color="gray.500" fontSize="sm">
          {minValueLabel}
          -
          {maxValueLabel}
        </Text>
      </HStack>
      <ChakraRangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={['min', 'max']}
        name={name}
        min={min}
        max={max}
        ref={ref}
        value={value}
        onChange={onChange}
      >
        <RangeSliderTrack boxSize={3} borderRadius={5}>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip label={minValueLabel}>
          <RangeSliderThumb boxSize={4} index={0} />
        </Tooltip>
        <Tooltip label={maxValueLabel}>
          <RangeSliderThumb boxSize={4} index={1} />
        </Tooltip>
      </ChakraRangeSlider>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const RangeSlider = memo(RangeSliderComponent);
