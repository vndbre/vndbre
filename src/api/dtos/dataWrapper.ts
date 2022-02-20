/**
 * Data wrapper.
 */
export interface DataWrapper<T> {

  /**
   * Data wrapper.
   */
  readonly data: {

    /**
     * Flag that shows if there is more data to fetch.
     */
    readonly more: boolean;

    /**
     * Number of items in response.
     */
    readonly num: number;

    /**
     * Array of items.
     */
    readonly items: readonly T[];
  };
}
