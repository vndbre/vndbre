import React, { VFC } from 'react';
import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Switch, Text, VStack } from '@chakra-ui/react';
import { useSettingsContext } from '../../providers';
import { SpoilerLevel } from '../../models/spoilerLevel';

/** Settings component. */
export const ViewSettings: VFC = () => {
  const {
    isNsfwContentAllowed,
    showTags,
    spoilerLevel,
    toggleNsfwContent,
    toggleTagContent,
    toggleTagEro,
    toggleTagTechnical,
    setSpoilerLevel,
  } = useSettingsContext();

  return (
    <VStack align="start" p="5" w="max-content">
      <Switch colorScheme="orange" isChecked={isNsfwContentAllowed} onChange={toggleNsfwContent}>NSFW</Switch>
      <Switch colorScheme="orange" isChecked={showTags.ero} onChange={toggleTagEro}>Ero tags</Switch>
      <Switch colorScheme="orange" isChecked={showTags.cont} onChange={toggleTagContent}>Content tags</Switch>
      <Switch colorScheme="orange" isChecked={showTags.tech} onChange={toggleTagTechnical}>Technical tags</Switch>
      <Box w="full">
        <Text>Spoiler level</Text>
        <Slider min={SpoilerLevel.None} max={SpoilerLevel.Major} defaultValue={spoilerLevel} onChange={setSpoilerLevel}>
          <SliderMark mt={1} value={SpoilerLevel.None}>
            None
          </SliderMark>
          <SliderMark mt={1} value={SpoilerLevel.Minor}>
            Minor
          </SliderMark>
          <SliderMark mt={1} value={SpoilerLevel.Major}>
            Major
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </VStack>
  );
};
