/**
 * Information about tab.
 */
export interface TabInfo {

  /**
   * Name/title of the tab.
   */
  name: string;

  /**
   * The path to which the user should be directed.
   */
  path: string;

  /**
   * Is the path complete or not.
   */
  end?: boolean;
}
