import { useCallback } from 'react';
import type { Image } from '@/api/models/image';
import { ImageDisplayLevel } from '@/api/models/imageDisplayLevel';
import type { Tag } from '@/api/models/tag/tag';
import type { Trait } from '@/api/models/trait';
import { useSettings } from '@/store/settingsAtom';

type ShouldBlurImageFn = (image: Image | null) => boolean;
type ShouldHideSexualTagFn = (tag: Tag) => boolean;
type ShouldHideSexualTraitFn = (trait: Trait) => boolean;

interface UseCensorResult {

  /** Checks whether image should be blurred. */
  readonly shouldBlurImage: ShouldBlurImageFn;

  /** Checks if sexual trait should be hidden. */
  readonly shouldHideSexualTrait: ShouldHideSexualTraitFn;

  /** Checks if sexual tag should be hidden. */
  readonly shouldHideSexualTag: ShouldHideSexualTagFn;
}

/** Hook for helping with censoring content. */
export const useCensor = (): UseCensorResult => {
  const [settings] = useSettings();

  const shouldBlurImage: ShouldBlurImageFn = useCallback(image => {
    const { imageDisplaySettings: { sexualLevel, violenceLevel } } = settings;
    if (image === null) {
      return false;
    }
    return image.sexual > ImageDisplayLevel.getValue(sexualLevel) ||
      image.violence > ImageDisplayLevel.getValue(violenceLevel);
  }, [settings.imageDisplaySettings]);

  const shouldHideSexualTrait: ShouldHideSexualTraitFn = useCallback(trait => {
    if (trait.parent === null) {
      return trait.name.toLocaleLowerCase().includes('sexual') && settings.hideSexualTags;
    }
    return trait.parent.name.toLocaleLowerCase().includes('sexual') && settings.hideSexualTags;
  }, [settings.hideSexualTags]);

  const shouldHideSexualTag: ShouldHideSexualTagFn = useCallback(tag =>
    tag.category === 'erotical' && settings.hideSexualTags, [settings.hideSexualTags]);

  return {
    shouldBlurImage,
    shouldHideSexualTag,
    shouldHideSexualTrait,
  };
};
