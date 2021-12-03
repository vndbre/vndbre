/**
 * Data wrapper.
 */
export interface DataWrapper<T> {

  /**
   * Data wrapper.
   */
  data: {

    /**
     * Flag that shows if there is more data to fetch.
     */
    more: boolean;

    /**
     * Number of items in response.
     */
    num: number;

    /**
     * Array of items.
     */
    items: T[];
  };
}
