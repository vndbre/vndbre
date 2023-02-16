import type { Image } from '../image';
import type { LanguageCode } from '../language';
import type { Platform } from '../platform';
import type { Tag } from '../tag';
import type { VnDevelopmentStatus } from './developmentStatus';
import type { VnLength } from './length';
import type { VnScreenshot } from './screenshot';
import type { VnTitle } from './title';

/** Vn. */
export interface Vn {

  /** Id. */
  readonly id: string;

  /** Title. */
  readonly title: string;

  /** Alternative vn title. */
  readonly altTitle: string | null;

  /** List of all titles for vn. */
  readonly titles: readonly VnTitle[];

  /** List of aliases. */
  readonly aliases: readonly string[];

  /** Original language for vn. */
  readonly originalLanguage: LanguageCode;

  /** Current dev status of vn. */
  readonly developmentStatus: VnDevelopmentStatus;

  /** Release date. */
  readonly released: string | null;

  /** List of languages that vn has. */
  readonly languages: readonly LanguageCode[];

  /** List of platforms that vn was released. */
  readonly platforms: readonly Platform[];

  /** Vn image(poster). */
  readonly image: Image | null;

  /** Vn length. */
  readonly length: VnLength | null;

  /** Vn length in minutes. */
  readonly lengthMinutes: number | null;

  /** Number of votes for vn length. */
  readonly lengthVotes: number;

  /** Description. */
  readonly description: string | null;

  /** Rating (10-100). */
  readonly rating: number | null;

  /** Popularity(0-100). */
  readonly popularity: number;

  /** Votes. */
  readonly voteCount: number;

  /** Screenshots. */
  readonly screenshots: VnScreenshot[];

  /** Tags. */
  readonly tags: readonly Tag[];
}
