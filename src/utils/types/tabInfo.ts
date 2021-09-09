/**
 * Information about tab.
 */
export interface TabInfo {

  /**
   * Name/title of the tab.
   */
  name: string;

  /**
   * The path to which tab redirects the user.
   */
  path: string;

  /**
   * Is the path complete or not.
   */
  end?: boolean;
}
