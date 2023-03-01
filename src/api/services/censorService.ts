import type { Image } from '../models/image';
import { ImageDisplayLevel } from '../models/imageDisplayLevel';
import type { ImageDisplaySettings } from '../models/settings/imageDisplaySettings';
import type { Tag } from '../models/tag/tag';
import type { Trait } from '../models/trait';

export namespace CensorService {

  /**
   * Checks whether image should be blurred or not.
   * @param image Image.
   * @param imageDisplaySettings Image display settings.
   */
  export function shouldBlurImage(
    image: Image | null, { sexualLevel, violenceLevel }: ImageDisplaySettings,
  ): boolean {
    if (image === null) {
      return false;
    }
    return image.sexual > ImageDisplayLevel.getValue(sexualLevel) ||
      image.violence > ImageDisplayLevel.getValue(violenceLevel);
  }

  export function shouldRemoveSexualTrait(
    trait: Trait, isSexualTraitsDisabled: boolean,
  ): boolean {
    if (trait.parent === null) {
      return trait.name.toLocaleLowerCase().includes('sexual') && isSexualTraitsDisabled;
    }
    return trait.parent.name.toLocaleLowerCase().includes('sexual') && isSexualTraitsDisabled;
  }

  export function shouldRemoveSexualTags(tag: Tag, isSexualTagsDisabled: boolean): boolean {
    return tag.category === 'erotical' && isSexualTagsDisabled;
  }
}
