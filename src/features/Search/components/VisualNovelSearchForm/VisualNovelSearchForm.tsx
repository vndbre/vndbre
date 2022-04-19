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
import { useForm } from 'react-hook-form';
import { Language } from '../../../../models/language';
import { Platform } from '../../../../models/platform';
import { SelectOption } from '../../../../theme/components/Select';
import { MultiSelect, RangeSlider } from '../../../../components';
import { Icon } from '../../../../components/Icon/Icon';

/** Visual novel search form data. */
export interface VisualNovelFormData {

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

const languageOptions: SelectOption[] = Language.getSorted().map(
  language => ({
    value: language,
    label: Language.toReadable(language),
    icon: Language.getIcon(language),
  }),
);

const platformOptions: SelectOption[] = Platform.getSorted().map(
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

interface Props {

  /** Submit handler. */
  readonly onSubmit: (data: VisualNovelFormData) => void;
}

/**
 * Visual novel search form.
 */
export const VisualNovelSearchForm: VFC<Props> = ({ onSubmit }) => {
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
    onSubmit(data);
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
            displayLimit={1}
            closeMenuOnSelect={false}
          />

          <MultiSelect
            control={control}
            name="originalLanguages"
            label="Original language"
            options={languageOptions}
            placeholder="Any"
            displayLimit={1}
            closeMenuOnSelect={false}
          />

          <MultiSelect
            control={control}
            name="platforms"
            label="Platform"
            options={platformOptions}
            placeholder="Any"
            displayLimit={1}
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
