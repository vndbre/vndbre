import React, { useCallback, useEffect, VFC } from 'react';
import {
  Box,
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
import { Language } from '../../../../../../models/language';
import { Platform } from '../../../../../../models/platform';
import { AsyncMultiSelect, MultiSelect, RangeSlider, TextInput } from '../../../../../../components';
import { Icon } from '../../../../../../components/Icon/Icon';
import { Debounce } from '../../../../../../utils/debounce';
import { SelectOption } from '../../../../../../utils/selectOption';
import { Tag } from '../../../../../../models/tag';
import { TagsService } from '../../../../../../api/services/tagsService';
import { useIsMobile } from '../../../../../../hooks/useIsMobile';

/** Visual novel search form data. */
export interface VisualNovelFormData {

  /** Visual novel name. */
  readonly title: string;

  /** Release year range. */
  readonly releaseYearRange: readonly [number, number];

  /** Languages. */
  readonly languages: readonly SelectOption<Language>[];

  /** Original languages. */
  readonly originalLanguages: readonly SelectOption<Language>[];

  /** Platforms. */
  readonly platforms: readonly SelectOption<Platform>[];

  /** Tags. */
  readonly tags: readonly SelectOption<Tag['id']>[];
}

const languageOptions = Language.getSorted().map(Language.toSelectOption);
const platformOptions = Platform.getSorted().map(Platform.toSelectOption);

const currentYear = new Date().getFullYear();
const MIN_RELEASE_YEAR = 1970;

const visualNovelFormInitialValues: VisualNovelFormData = {
  title: '',
  releaseYearRange: [MIN_RELEASE_YEAR, currentYear],
  languages: [],
  originalLanguages: [],
  platforms: [],
  tags: [],
};

interface Props {

  /** Form submit handler. */
  readonly onSubmit: (data: VisualNovelFormData) => void;

  /** Default values of the form. */
  readonly defaultFormValues?: Partial<VisualNovelFormData>;
}

/**
 * Visual novel search form.
 */
export const VisualNovelSearchForm: VFC<Props> = ({ onSubmit, defaultFormValues }) => {
  const {
    handleSubmit,
    watch,
    control,
  } = useForm({ defaultValues: { ...visualNovelFormInitialValues, ...defaultFormValues } });
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * Handles submission of the visual novel form.
   * @param data Form data.
   */
  const handleVisualNovelFormSubmit = (data: VisualNovelFormData): void => {
    onSubmit(data);
  };

  const handleVisualNovelFormSubmitDebounced = useCallback(Debounce.apply(handleVisualNovelFormSubmit), []);

  const loadTags = useCallback(async(search: string) => {
    const tags = await TagsService.fetchTags({ search });
    return tags.map(Tag.toSelectOption);
  }, []);

  useEffect(() => {
    const subscription = watch(
      data => handleSubmit(() => handleVisualNovelFormSubmitDebounced(data as VisualNovelFormData))(),
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  const isMobile = useIsMobile();

  return (
    <form>
      <Box display="flex" width="full" alignItems="end" gap={4}>
        <TextInput
          control={control}
          name="title"
          label="Search"
          leftElement={<Icon name="carbon:search" />}
        />

        {!isMobile && (
          <>
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
              name="platforms"
              label="Platform"
              options={platformOptions}
              placeholder="Any"
              displayLimit={1}
              closeMenuOnSelect={false}
            />
          </>
        )}
        <IconButton
          aria-label="Open modal with more filter options"
          onClick={onOpen}
          icon={<Icon name="carbon:settings-adjust" />}
          colorScheme="gray"
          size="sm"
        />
      </Box>
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

              <HStack width="full" alignItems="end">
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

              <HStack width="full">
                <RangeSlider
                  control={control}
                  name="releaseYearRange"
                  label="Release date"
                  min={MIN_RELEASE_YEAR}
                  max={currentYear}
                />
              </HStack>

              <HStack width="full">
                <AsyncMultiSelect
                  control={control}
                  placeholder="Any"
                  name="tags"
                  label="Tags"
                  loadOptions={loadTags}
                />
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </form>
  );
};
