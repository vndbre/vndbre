import React, { VFC } from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import { chakraComponents, GroupBase, MultiValueGenericProps, OptionProps } from 'chakra-react-select';
import { useForm } from 'react-hook-form';
import { Language } from '../../../../models/language';
import { Platform } from '../../../../models/platform';
import { SelectOption } from '../../../../theme/components/Select';
import { MultiSelect, RangeSlider } from '../../../../components';
import { Icon } from '../../../../components/Icon/Icon';

interface VisualNovelFormData {

  /** Visual novel name. */
  readonly title: string;

  /** Length range. */
  readonly lengthRange: readonly [number, number];

  /** Release year range. */
  readonly releaseYearRange: readonly [number, number];

  /** Languages. */
  readonly languages: readonly Language[];

  /** Original languages. */
  readonly originalLanguages: readonly Language[];

  /** Platforms. */
  readonly platforms: readonly Platform[];
}

const languageOptions: SelectOption[] = Language.getSortedLanguages().map(
  language => ({
    value: language,
    label: Language.toReadable(language),
    icon: Language.getLanguageIcon(language),
  }),
);

const languageSelectCustomComponents = {

  /** Custom chakra option component for languages. */
  Option: ({ children, ...props }: OptionProps<SelectOption, true, GroupBase<SelectOption>>) => (
    <chakraComponents.Option {...props}>
      {props.data.icon && <Icon name={props.data.icon} style={{ marginRight: 10 }} />}
      {children}
    </chakraComponents.Option>
  ),

  /** Custom chakra multi value container component for languages. */
  MultiValueContainer: ({
    children,
    ...props
  }: MultiValueGenericProps<SelectOption, true, GroupBase<SelectOption>>) => (
    <chakraComponents.MultiValueContainer {...props}>
      {props.data.icon && <Icon name={props.data.icon} style={{ marginRight: 4 }} />}
      {children}
    </chakraComponents.MultiValueContainer>
  ),
};

const platformOptions: SelectOption[] = Platform.getSortedPlatforms().map(
  platform => ({ value: platform, label: Platform.toReadable(platform) }),
);

const currentYear = new Date().getFullYear();

const visualNovelFormInitialValues: VisualNovelFormData = {
  title: '',
  lengthRange: [0, 50],
  releaseYearRange: [1970, currentYear],
  languages: [],
  originalLanguages: [],
  platforms: [],
};

/**
 * Visual novel search form.
 */
export const VisualNovelSearchForm: VFC = () => {
  const {
    handleSubmit,
    register,
    control,
  } = useForm({ defaultValues: visualNovelFormInitialValues });

  /**
   * Handles submission of visual novel form.
   * @param data Form data.
   */
  function handleVisualNovelFormSubmit(data: VisualNovelFormData): void {
    /** TODO (Panov A.): Remove console.log. */
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(handleVisualNovelFormSubmit)}>
      <VStack gap={4}>
        <FormControl>
          <InputGroup>
            <InputLeftElement>
              <Icon name="carbon:search" />
            </InputLeftElement>
            <Input type="text" {...register('title')} />
          </InputGroup>
        </FormControl>

        <HStack width="full">
          <MultiSelect
            control={control}
            name="languages"
            label="Language"
            options={languageOptions}
            placeholder="Any"
            closeMenuOnSelect={false}
            components={languageSelectCustomComponents}
          />

          <MultiSelect
            control={control}
            name="originalLanguages"
            label="Original language"
            options={languageOptions}
            placeholder="Any"
            closeMenuOnSelect={false}
            components={languageSelectCustomComponents}
          />

          <MultiSelect
            control={control}
            name="platforms"
            label="Platform"
            options={platformOptions}
            placeholder="Any"
            closeMenuOnSelect={false}
          />
        </HStack>

        <HStack width="full" gap={6}>
          <RangeSlider
            control={control}
            name="lengthRange"
            label="Length"
            min={0}
            max={50}
          />
          <RangeSlider
            control={control}
            name="releaseYearRange"
            label="Release date"
            min={1970}
            max={currentYear}
          />
        </HStack>
      </VStack>
      <Button type="submit">Submit</Button>
    </form>
  );
};
