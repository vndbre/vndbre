import { Links } from './links';

/**
 * Represents links for producer.
 */
export interface ProducerLinks extends Links {

  /**
   * Producer's homepage url.
   */
  homepage: string | null;
}
