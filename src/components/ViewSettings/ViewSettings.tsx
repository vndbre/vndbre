import React, { VFC } from 'react';
import { Switch, VStack } from '@chakra-ui/react';
import { useSettingsContext } from '../../providers';

/** Settings component. */
export const ViewSettings: VFC = () => {
  const {
    isNsfwContentAllowed,
    showTags,
    toggleNsfwContent,
    toggleTagContent,
    toggleTagEro,
    toggleTagTechnical,
  } = useSettingsContext();

  return (
    <VStack align="start" p="4" w="max-content">
      <Switch colorScheme="orange" isChecked={isNsfwContentAllowed} onChange={toggleNsfwContent}>NSFW</Switch>
      <Switch colorScheme="orange" isChecked={showTags.ero} onChange={toggleTagEro}>Ero tags</Switch>
      <Switch colorScheme="orange" isChecked={showTags.cont} onChange={toggleTagContent}>Content tags</Switch>
      <Switch colorScheme="orange" isChecked={showTags.tech} onChange={toggleTagTechnical}>Technical tags</Switch>
    </VStack>
  );
};
