import { Links } from './links';

/**
 * Represents staff external links.
 */
export interface StaffLinks extends Links {

  /**
   * Twitter account name.
   */
  twitter: string | null;

  /**
   * AniDB creator id.
   */
  anidb: string | null;

  /**
   * Id of pixiv account.
   */
  pixiv: string | null;
}
