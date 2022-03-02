import { Links } from './links';

/**
 * Represents staff external links.
 */
export interface StaffLinks extends Links {

  /**
   * Twitter account name.
   */
  readonly twitter: string | null;

  /**
   * AniDB creator id.
   */
  readonly anidb: string | null;

  /**
   * Id of pixiv account.
   */
  readonly pixiv: string | null;
}
