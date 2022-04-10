import React, { useCallback, useEffect, VFC } from 'react';
import {
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Language } from '../../../../models/language';
import { Platform } from '../../../../models/platform';
import { SelectOption } from '../../../../theme/components/Select';
import { MultiSelect, RangeSlider, TextInput } from '../../../../components';
import { Icon } from '../../../../components/Icon/Icon';
import { debounce } from '../../../../utils/debounce';

/** Visual novel search form data. */
export interface VisualNovelFormData {

  /** Visual novel name. */
  readonly title: string;

  /** Length range. */
  readonly lengthRange: readonly [number, number];

  /** Release year range. */
  readonly releaseYearRange: readonly [number, number];

  /** Languages. */
  readonly languages: readonly SelectOption<Language>[];

  /** Original languages. */
  readonly originalLanguages: readonly SelectOption<Language>[];

  /** Platforms. */
  readonly platforms: readonly SelectOption<Platform>[];
}

const languageOptions: SelectOption<Language>[] = Language.getSortedLanguages().map(
  language => ({
    value: language,
    label: Language.toReadable(language),
    icon: Language.getLanguageIcon(language),
  }),
);

const platformOptions: SelectOption<Platform>[] = Platform.getSortedPlatforms().map(
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

  /** Form submit handler. */
  readonly onSubmit: (data: VisualNovelFormData) => void;
}

/**
 * Visual novel search form.
 */
export const VisualNovelSearchForm: VFC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    watch,
    control,
  } = useForm({ defaultValues: visualNovelFormInitialValues });

  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * Handles submission of the visual novel form.
   * @param data Form data.
   */
  const handleVisualNovelFormSubmit = (data: VisualNovelFormData): void => {
    console.log(data);
    onSubmit(data);
  };

  const handleVisualNovelFormSubmitDebounced = useCallback(debounce(handleVisualNovelFormSubmit), []);

  useEffect(() => {
    const subscription = watch(
      data => handleSubmit(() => handleVisualNovelFormSubmitDebounced(data as VisualNovelFormData))(),
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form>
      <HStack width="full" alignItems="end" gap={4}>
        <TextInput
          control={control}
          name="title"
          label="Search"
          leftElement={<Icon name="carbon:search" />}
        />

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

        <IconButton
          aria-label="Open modal with more filter options"
          onClick={onOpen}
          icon={<Icon name="carbon:settings-adjust" />}
          colorScheme="gray"
          height={10}
        />
      </HStack>
      <Modal
        size="5xl"
        onClose={onClose}
        isOpen={isOpen}
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding={12}>
            <VStack gap={14}>
              <HStack width="full">
                <TextInput
                  control={control}
                  name="title"
                  leftElement={<Icon name="carbon:search" />}
                />
              </HStack>

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
          </ModalBody>
        </ModalContent>
      </Modal>
    </form>
  );
};
