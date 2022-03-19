import React, { VFC, memo, useMemo } from 'react';
import { TagList } from '../../../../components';
import { useSettingsContext } from '../../../../providers';
import { ExtendedTrait } from '../../../../models/extendedTrait';
import { ExtendedTraitsWithRoots } from '../../../../models/extendedTraitWithRoots';
import { RootTraitName } from '../../../../models/rootTraitName';

interface Props {

  /** Character traits with its root traits. */
  readonly traits: ExtendedTraitsWithRoots;
}

/** Character traits. */
const CharacterTraitsComponent: VFC<Props> = ({ traits }) => {
  const { isNsfwContentAllowed, spoilerLevel } = useSettingsContext();

  /**
   * Filters traits by spoiler level.
   * @param trait Trait to validate.
   */
  function traitsFilterPredicate(trait: ExtendedTrait): boolean {
    return trait.spoilerLevel <= spoilerLevel;
  }

  const groupedTraits = useMemo(() => {
    const initialGroupedTraits: Record<RootTraitName, ExtendedTrait[]> = {
      [RootTraitName.Hair]: [],
      [RootTraitName.Eyes]: [],
      [RootTraitName.Body]: [],
      [RootTraitName.Clothes]: [],
      [RootTraitName.Items]: [],
      [RootTraitName.Personality]: [],
      [RootTraitName.Role]: [],
      [RootTraitName.EngagesIn]: [],
      [RootTraitName.SubjectOf]: [],
      [RootTraitName.SubjectOfSexual]: [],
      [RootTraitName.EngagesInSexual]: [],
    };
    const { traits: childTraits, rootTraits } = traits;
    return rootTraits.reduce((acc, cur) => {
      const isTraitSexual = cur.name === RootTraitName.EngagesInSexual || cur.name === RootTraitName.SubjectOfSexual;
      if (isTraitSexual && isNsfwContentAllowed === false) {
        return acc;
      }

      const relatedTraits = childTraits.filter(trait => trait.rootId === cur.id);
      return { ...acc, [cur.name]: [...acc[cur.name as RootTraitName], ...relatedTraits] };
    }, initialGroupedTraits);
  }, [traits, isNsfwContentAllowed]);

  return (
    <>
      {Object.entries(groupedTraits).map(
        ([rootTraitTitle, childTraits]) => childTraits.length > 0 && (
          <TagList
            isExpandable
            key={rootTraitTitle}
            title={rootTraitTitle}
            tags={childTraits.filter(traitsFilterPredicate).map(trait => ({ name: trait.name }))}
          />
        ),
      )}
    </>
  );
};

export const CharacterTraits = memo(CharacterTraitsComponent);
