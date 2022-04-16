import React, { useEffect, VFC } from 'react';
import { Box, FormControl, Radio, RadioGroup, Switch, Text, VStack } from '@chakra-ui/react';
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
      <VStack align="start" p="5" w="max-content">
        <FormControl>
          <Switch colorScheme="orange" {...register('isNsfwContentAllowed')}>NSFW</Switch>
        </FormControl>
        <FormControl>
          <Switch colorScheme="orange" {...register('showTags.ero')}>Ero tags</Switch>
        </FormControl>
        <FormControl>
          <Switch colorScheme="orange" {...register('showTags.cont')}>Content tags</Switch>
        </FormControl>
        <FormControl>
          <Switch colorScheme="orange" {...register('showTags.tech')}>Technical tags</Switch>
        </FormControl>
        <Box w="full">
          <Text>Spoiler level</Text>
          <Controller
            control={control}
            name="spoilerLevel"
            render={({ field: { onChange, value } }) => (
              <RadioGroup colorScheme="orange" value={value} onChange={val => onChange(Number(val))}>
                <VStack align="start">
                  <Radio name="spoilerLevel" value={SpoilerLevel.None}>None</Radio>
                  <Radio value={SpoilerLevel.Minor}>Minor</Radio>
                  <Radio value={SpoilerLevel.Major}>Major</Radio>
                </VStack>
              </RadioGroup>
            )}
          />
        </Box>
      </VStack>
    </form>
  );
};
