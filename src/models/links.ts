/**
 * Links to external resources.
 */
export interface Links {

  /**
   * Name of the related article on the English Wikipedia.
   */
  readonly wikipedia: string | null;

  /**
   * Wikidata identifier.
   */
  readonly wikidata: string | null;
}

export namespace Links {

  /**
   * Checks if every link is empty.
   * @param links Links object.
   */
  export const checkLinksAreEmpty = (links: Links): boolean => Object.entries(links).every(([_, value]) => value === null);
}
