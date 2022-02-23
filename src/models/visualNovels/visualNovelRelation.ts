/** Represents visual novel relation type. */
export enum VisualNovelRelation {
  Alternative = 'alternative',
  SharesCharacters = 'shares characters',
  Prequel = 'prequel',
  SideStory = 'side story',
  SameSetting = 'same setting',
  FanDisc = 'fandisc',
  Sequel = 'sequel',
  SameSeries = 'same series',
  ParentStory = 'parent story',
}

export namespace VisualNovelRelation {

  /** Shape of relation data. */
  export interface RelationInfo {

    /** Is relation official. */
    readonly isOfficial: boolean;

    /** Relation type of novel. */
    readonly relationType: VisualNovelRelation;
  }

  const TO_READABLE_MAP: Record<VisualNovelRelation, string> = {
    [VisualNovelRelation.Alternative]: 'Alternative version',
    [VisualNovelRelation.SharesCharacters]: 'Shares characters',
    [VisualNovelRelation.SideStory]: 'Side story',
    [VisualNovelRelation.SameSetting]: 'Same setting',
    [VisualNovelRelation.FanDisc]: 'Fandisc',
    [VisualNovelRelation.Sequel]: 'Sequel',
    [VisualNovelRelation.Prequel]: 'Prequel',
    [VisualNovelRelation.SameSeries]: 'Same series',
    [VisualNovelRelation.ParentStory]: 'Parent story',
  };

  /**
   * Converts a certain visual novel relation type into readable equivalent.
   * @param value Relation type.
   */
  export function toReadable(value: VisualNovelRelation): string {
    return TO_READABLE_MAP[value];
  }
}
