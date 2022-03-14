import React, { VFC, memo, useMemo } from 'react';
import { Grid } from '@chakra-ui/react';
import { RootTraitTitle } from '../../../../api/services/traitsService';
import { TagBlock } from '../../../../components';
import { Trait } from '../../../../models/trait';
import { TraitsWithRoot } from '../../../../models/traitsWithRoot';
import { useSettingsContext } from '../../../../providers';

interface Props {

  /** Character traits with its root traits. */
  readonly traits: TraitsWithRoot;
}

/** Character traits. */
const CharacterTraitsComponent: VFC<Props> = ({ traits }) => {
  const { isNsfwContentAllowed } = useSettingsContext();

  const groupedTraits = useMemo(() => {
    const initialGroupedTraits: Record<RootTraitTitle, Trait[]> = {
      [RootTraitTitle.Hair]: [],
      [RootTraitTitle.Eyes]: [],
      [RootTraitTitle.Body]: [],
      [RootTraitTitle.Clothes]: [],
      [RootTraitTitle.Items]: [],
      [RootTraitTitle.Personality]: [],
      [RootTraitTitle.Role]: [],
      [RootTraitTitle.EngagesIn]: [],
      [RootTraitTitle.SubjectOf]: [],
      [RootTraitTitle.SubjectOfSexual]: [],
      [RootTraitTitle.EngagesInSexual]: [],
    };
    const { traits: childTraits, rootTraits } = traits;
    return rootTraits.reduce((acc, cur) => {
      const isTraitSexual = cur.name === RootTraitTitle.EngagesInSexual || cur.name === RootTraitTitle.SubjectOfSexual;
      if (isTraitSexual && isNsfwContentAllowed === false) {
        return acc;
      }

      const relatedTraits = childTraits.filter(trait => trait.rootId === cur.id);
      return { ...acc, [cur.name]: [...acc[cur.name as RootTraitTitle], ...relatedTraits] };
    }, initialGroupedTraits);
  }, [traits]);

  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" mt="8" gap="8">
      {Object.entries(groupedTraits).map(
        ([rootTraitTitle, childTraits]) => childTraits.length > 0 && (
          <TagBlock
            isExpandable
            key={rootTraitTitle}
            title={rootTraitTitle}
            tags={childTraits.map(trait => ({ name: trait.name }))}
          />
        ),
      )}
    </Grid>
  );
};

export const CharacterTraits = memo(CharacterTraitsComponent);
