import React, { useCallback, useEffect, VFC } from 'react';
import { HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { TextInput } from '../../../../components';
import { Icon } from '../../../../components/Icon/Icon';
import { debounce } from '../../../../utils/debounce';

/** Character search form data. */
export interface CharacterFormData {

  /** Search query. */
  readonly search: string;
}

const characterFormInitialValues: Partial<CharacterFormData> = {
  search: '',
};

interface Props {

  /** Form submit handler. */
  readonly onSubmit: (data: CharacterFormData) => void;

  /** Default values of the form. */
  readonly defaultFormValues?: Partial<CharacterFormData>;
}

/**
 * Character search form.
 */
export const CharacterSearchForm: VFC<Props> = ({ onSubmit, defaultFormValues }) => {
  const {
    handleSubmit,
    watch,
    control,
  } = useForm({ defaultValues: { ...characterFormInitialValues, ...defaultFormValues } });

  /**
   * Handles submission of the form.
   * @param data Form data.
   */
  const handleCharacterFormSubmit = (data: CharacterFormData): void => {
    onSubmit(data);
  };

  const handleCharacterFormSubmitDebounced = useCallback(debounce(handleCharacterFormSubmit), []);

  useEffect(() => {
    const subscription = watch(
      data => handleSubmit(() => handleCharacterFormSubmitDebounced(data as CharacterFormData))(),
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form>
      <HStack width="full" alignItems="end" gap={4}>
        <TextInput
          control={control}
          name="search"
          label="Search"
          leftElement={<Icon name="carbon:search" />}
        />
      </HStack>
    </form>
  );
};
