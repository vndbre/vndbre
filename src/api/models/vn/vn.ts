import type { Image } from '../image';
import type { LanguageCode } from '../language';
import type { Platform } from '../platform';
import type { Tag } from '../tag';
import type { VnDevelopmentStatus } from './developmentStatus';
import type { VnLength } from './length';
import type { VnScreenshot } from './screenshot';

export interface Vn {
  readonly id: string;
  readonly title: string;
  readonly altTitle: string | null;
  readonly titles: readonly VnTitle[];
  readonly aliases: readonly string[];
  readonly originalLanguage: LanguageCode;
  readonly developmentStatus: VnDevelopmentStatus;
  readonly released: string | null;
  readonly languages: readonly LanguageCode[];
  readonly platforms: readonly Platform[];
  readonly image: Image | null;
  readonly length: VnLength | null;
  readonly lengthMinutes: number | null;
  readonly lengthVotes: number;
  readonly description: string | null;
  readonly rating: number | null;
  readonly popularity: number;
  readonly voteCount: number;
  readonly screenshots: VnScreenshot[];
  readonly tags: readonly Tag[];
}
