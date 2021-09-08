import { Links } from './links';

/**
 * Represents links related to vn.
 */
export interface VisualNovelLinks extends Links {

  /**
   * The URL-encoded tag used on encubed.
   */
  encubed: string;

  /**
   * The name part of the url on renai.us.
   */
  renai: string;
}
