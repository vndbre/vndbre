import React, { useEffect, VFC } from 'react';
import { Box, Checkbox, Divider, FormControl, Radio, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSettingsContext } from '../../providers';
import { SpoilerLevel } from '../../models/spoilerLevel';
import { RadioGroup } from '../RadioGroup/RadioGroup';

/** Settings component. */
export const ViewSettingsForm: VFC = () => {
  const {
    isNsfwContentAllowed,
    tagsVisibility,
    spoilerLevel,
    updateSettings,
  } = useSettingsContext();

  const { handleSubmit, register, watch, control } = useForm({ defaultValues: { isNsfwContentAllowed, tagsVisibility, spoilerLevel } });

  useEffect(() => {
    const subscription = watch(() => handleSubmit(updateSettings)());
    return () => subscription.unsubscribe();
  }, []);

  return (
    <form onSubmit={handleSubmit(updateSettings)}>
      <VStack align="start" spacing="4" p="6">
        <VStack align="start" spacing="3">
          <FormControl>
            <Checkbox colorScheme="orange" {...register('isNsfwContentAllowed')}>NSFW</Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox colorScheme="orange" {...register('tagsVisibility.ero')}>Ero tags</Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox colorScheme="orange" {...register('tagsVisibility.cont')}>Content tags</Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox colorScheme="orange" {...register('tagsVisibility.tech')}>Technical tags</Checkbox>
          </FormControl>
        </VStack>
        <Divider borderColor="gray.300" />
        <Box w="full" mt="4">
          <RadioGroup control={control} name="spoilerLevel">
            <VStack align="start" spacing="3">
              <Radio name="spoilerLevel" value={SpoilerLevel.None}>Hide spoilers</Radio>
              <Radio value={SpoilerLevel.Minor}>Show minor spoilers</Radio>
              <Radio value={SpoilerLevel.Major}>Show major spoilers</Radio>
            </VStack>
          </RadioGroup>
        </Box>
      </VStack>
    </form>
  );
};
