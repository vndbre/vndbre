import type { ExtractStrict } from '@/api/utils/strictExtract';
import type { BaseQueryOptions } from '../../baseQueryOptions';
import type { CharacterRole } from '../../character/characterRole';
import type { Gender } from '../../character/gender';
import type { BaseFilter, Operator } from '../../search/baseFilter';
import type { CharacterSearchField } from './characterSearchField';
import type { CharacterSortField } from './characterSortField';

type FieldsWithOrder = ExtractStrict<CharacterSearchField, 'height' | 'weight' | 'bust' | 'hips' | 'age' | 'cup' | 'waist'>;
type MatchFields = Exclude<CharacterSearchField, FieldsWithOrder>;

export type CharacterFilter =
| BaseFilter<MatchFields, ExtractStrict<Operator, '=' | '!='>>
| BaseFilter<CharacterSortField | FieldsWithOrder, Operator>;

/** Tag query options. */
export interface CharacterQueryOptions extends BaseQueryOptions<CharacterSortField> {

  /** Id. */
  readonly id?: string;

  /** Character role. */
  readonly roles?: readonly CharacterRole[];

  /** Character age. */
  readonly age?: number | null;

  /** Bust size. */
  readonly bust?: number | null;

  /** Voice actor id. */
  readonly seiyuuId?: string;

  /** Vn id. */
  readonly vnId?: string;

  /** Gender. */
  readonly gender?: Gender;

  /** List of trait ids. */
  readonly traits?: readonly string[];
}
