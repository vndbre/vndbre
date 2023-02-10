export type TagCategory = 'ero' | 'cont' | 'tech';

export interface Tag {
  readonly id: string;
  readonly aliases: readonly string[];
  readonly name: string;
  readonly category: TagCategory;
}
