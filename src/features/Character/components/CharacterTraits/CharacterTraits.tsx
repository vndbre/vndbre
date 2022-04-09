import React, { VFC, memo } from 'react';
import { TagList } from '../../../../components';
import { useSettingsContext } from '../../../../providers';
import { ExtendedTrait } from '../../../../models/extendedTrait';
import { ExtendedTraitsWithRoots } from '../../../../models/extendedTraitWithRoots';
import { RootTraitName } from '../../../../models/rootTraitName';
import { TraitsService } from '../../../../api/services/traitsService';

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

  /**
   * Filters grouped traits by root trait name by nsfw content.
   */
  function groupedTraitsFilterPredicate([rootName]: [string, ExtendedTrait[]]): boolean {
    const isTraitSexual = rootName === RootTraitName.EngagesInSexual || rootName === RootTraitName.SubjectOfSexual;
    return !isTraitSexual || isNsfwContentAllowed;
  }

  return (
    <>
      {Object.entries(TraitsService.getGroupedTraitsByRootTrait(traits.traits, traits.rootTraits))
        .filter(groupedTraitsFilterPredicate)
        .map(
          ([rootTraitTitle, childTraits]) => childTraits.length > 0 && (
            <TagList
              isExpandable
              key={rootTraitTitle}
              title={rootTraitTitle}
              tags={childTraits.filter(traitsFilterPredicate).map(trait => ({ name: trait.name, note: null }))}
            />
          ),
        )}
    </>
  );
};

export const CharacterTraits = memo(CharacterTraitsComponent);
