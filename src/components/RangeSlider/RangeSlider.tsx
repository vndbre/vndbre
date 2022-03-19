import React, { memo, VFC } from 'react';
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
}

/**
 * Custom range slider based on Chakra UI RangeSlider component.
 */
const RangeSliderComponent: VFC<Props> = ({ control, name, label, rules, min, max }) => {
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, error },
  } = useController<Record<string, [number, number]>>({
    name,
    control,
    rules,
  });

  return (
    <FormControl isInvalid={invalid} id={name}>
      <HStack justifyContent="space-between">
        <FormLabel>{label}</FormLabel>
        <Text color="gray.500" fontSize="sm">
          {value[0]}
          -
          {value[1]}
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
        <Tooltip label={value[0]}>
          <RangeSliderThumb boxSize={4} index={0} />
        </Tooltip>
        <Tooltip label={value[1]}>
          <RangeSliderThumb boxSize={4} index={1} />
        </Tooltip>
      </ChakraRangeSlider>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const RangeSlider = memo(RangeSliderComponent);
