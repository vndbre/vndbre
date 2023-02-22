import type { MultiValue, SingleValue } from 'react-select';
import type { CharacterRole } from 'src/api/models/character/characterRole';
import type { Gender } from 'src/api/models/character/gender';
import type { CharacterQueryOptions } from 'src/api/models/queryOptions/character/characterQueryOptions';
import type { SelectOption } from 'src/components/Select';

export interface CharacterSearchFormValues {
  readonly search: string;
  readonly vn: SingleValue<Omit<SelectOption, 'icon'>>;
  readonly roles: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly gender: SingleValue<Omit<SelectOption, 'icon'>>;

  // readonly languages: MultiValue<Omit<SelectOption, 'icon'>>;
  // readonly originalLanguage: SingleValue<Omit<SelectOption, 'icon'>>;
  // readonly platforms: MultiValue<Omit<SelectOption, 'icon'>>;
  // readonly tags: MultiValue<Omit<SelectOption, 'icon'>>;
  // readonly popularity: [number, number];
  // readonly released: [number, number];
  // readonly rating: [number, number];
  // readonly sortField: SingleValue<Omit<SelectOption, 'icon'>>;
  // readonly sortDirection: SortOrder;
  // readonly developmentStatus: SingleValue<Omit<SelectOption, 'icon'>>;
}

export const CHARACTER_SEARCH_INITIAL_VALUES: CharacterSearchFormValues = {
  search: '',
  vn: null,
  roles: [],
  gender: null,
};

export namespace CharacterSearchFormValues {
  export function toQueryOptions(data = CHARACTER_SEARCH_INITIAL_VALUES): CharacterQueryOptions {
    return {
      search: data.search,
      vnId: data.vn?.value,
      roles: data.roles?.map(roles => roles.value as CharacterRole),
      gender: data.gender?.value as Gender,
    };
  }
}
