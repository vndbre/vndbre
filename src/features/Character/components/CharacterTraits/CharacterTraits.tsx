import React, { VFC, memo, useMemo } from 'react';
import { RootTraitTitle } from '../../../../api/services/traitsService';
import { TagBlock } from '../../../../components';
import { useSettingsContext } from '../../../../providers';
import { ExtendedTrait } from '../../../../models/extendedTrait';
import { ExtendedTraitsWithRoots } from '../../../../models/extendedTraitWithRoots';

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
    const initialGroupedTraits: Record<RootTraitTitle, ExtendedTrait[]> = {
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
  }, [traits, isNsfwContentAllowed]);

  return (
    <>
      {Object.entries(groupedTraits).map(
        ([rootTraitTitle, childTraits]) => childTraits.length > 0 && (
          <TagBlock
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
