import React, { useEffect, VFC } from 'react';
import { Box, Checkbox, Divider, FormControl, Radio, RadioGroup, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useSettingsContext } from '../../providers';
import { SpoilerLevel } from '../../models/spoilerLevel';

/** Settings component. */
export const ViewSettingsForm: VFC = () => {
  const {
    isNsfwContentAllowed,
    showTags,
    spoilerLevel,
    updateSettings,
  } = useSettingsContext();

  const { handleSubmit, register, watch, control } = useForm({ defaultValues: { isNsfwContentAllowed, showTags, spoilerLevel } });

  useEffect(() => {
    const subscription = watch(() => handleSubmit(updateSettings)());
    return () => subscription.unsubscribe();
  }, []);

  return (
    <form onSubmit={handleSubmit(updateSettings)}>
      <VStack align="start" spacing="4" p="6">
        <VStack align="start">
          <FormControl>
            <Checkbox colorScheme="orange" {...register('isNsfwContentAllowed')}>NSFW</Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox colorScheme="orange" {...register('showTags.ero')}>Ero tags</Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox colorScheme="orange" {...register('showTags.cont')}>Content tags</Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox colorScheme="orange" {...register('showTags.tech')}>Technical tags</Checkbox>
          </FormControl>
        </VStack>
        <Divider borderColor="gray.300" />
        <Box w="full" mt="4">
          <Controller
            control={control}
            name="spoilerLevel"
            render={({ field: { onChange, value } }) => (
              <RadioGroup colorScheme="orange" value={value} onChange={val => onChange(Number(val))}>
                <VStack align="start">
                  <Radio name="spoilerLevel" value={SpoilerLevel.None}>Hide spoilers</Radio>
                  <Radio value={SpoilerLevel.Minor}>Show minor spoilers</Radio>
                  <Radio value={SpoilerLevel.Major}>Show major spoilers</Radio>
                </VStack>
              </RadioGroup>
            )}
          />
        </Box>
      </VStack>
    </form>
  );
};
