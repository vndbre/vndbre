import { RelationType, VisualNovel } from '../../models/visualNovel';

/** Shape of relation data. */
export interface RelationData {

  /** Is relation official. */
  readonly isOfficial: boolean;

  /** Relation type of novel. */
  readonly relationType: RelationType;
}

export namespace VisualNovelRelationService {

  const MAP_RELATION_TYPE: Record<RelationType, string> = {
    [RelationType.Alternative]: 'Alternative version',
    [RelationType.SharesCharacters]: 'Shares characters',
    [RelationType.SideStory]: 'Side story',
    [RelationType.SameSetting]: 'Same setting',
    [RelationType.FanDisc]: 'Fandisc',
    [RelationType.Sequel]: 'Sequel',
    [RelationType.Prequel]: 'Prequel',
    [RelationType.SameSeries]: 'Same series',
    [RelationType.ParentStory]: 'Parent story',
  };

  /**
   * Gets relation type for related novel.
   * @param relatedNovelId Related novel id.
   */
  export const getRelationData = (relatedNovelId: number, novel: VisualNovel): RelationData => {
    const relationData = novel.relations.find(relation => relation.id === relatedNovelId);
    return { relationType: relationData?.relation ?? RelationType.SharesCharacters, isOfficial: relationData?.isOfficial ?? false };
  };

  /**
   * Converts relation type into readable equivalent.
   * @param value Relation type.
   */
  export const toReadable = (value: RelationType): string => MAP_RELATION_TYPE[value];
}
