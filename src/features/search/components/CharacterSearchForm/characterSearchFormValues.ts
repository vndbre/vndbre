import type { MultiValue, SingleValue } from 'react-select';
import type { CharacterRole } from 'src/api/models/character/characterRole';
import type { Gender } from 'src/api/models/character/gender';
import type { CharacterQueryOptions } from 'src/api/models/queryOptions/character/characterQueryOptions';
import { CharacterSortField } from 'src/api/models/queryOptions/character/characterSortField';
import type { SortOrder } from 'src/api/models/sortOptions';
import type { SelectOption } from 'src/components/Select';

export interface CharacterSearchFormValues {
  readonly search: string;
  readonly vn: SingleValue<Omit<SelectOption, 'icon'>>;
  readonly roles: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly gender: SingleValue<Omit<SelectOption, 'icon'>>;
  readonly sortField: SingleValue<Omit<SelectOption, 'icon'>>;
  readonly sortDirection: SortOrder;
}

export const CHARACTER_SEARCH_INITIAL_VALUES: CharacterSearchFormValues = {
  search: '',
  vn: null,
  roles: [],
  gender: null,
  sortField: {
    label: CharacterSortField.toReadable('id'),
    value: 'id',
  },
  sortDirection: 'asc',

  // TODO: Add more fields once slider will be updated.
};

export namespace CharacterSearchFormValues {
  export function toQueryOptions(data = CHARACTER_SEARCH_INITIAL_VALUES): CharacterQueryOptions {
    return {
      search: data.search,
      vnId: data.vn?.value,
      roles: data.roles?.map(roles => roles.value as CharacterRole),
      gender: data.gender?.value as Gender,
      sort: {
        field: data.sortField?.value as CharacterSortField,
        order: data?.sortDirection,
      },
    };
  }
}
