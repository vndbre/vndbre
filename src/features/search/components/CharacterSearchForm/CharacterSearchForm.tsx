import type { FC } from 'react';
import { useMemo, useCallback, useState, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { CharacterRole, CHARACTER_ROLES } from 'src/api/models/character/characterRole';
import { Gender, GENDERS } from 'src/api/models/character/gender';
import { Pagination } from 'src/api/models/pagination';
import { CharacterSortField, CHARACTER_SORT_FIELDS } from 'src/api/models/queryOptions/character/characterSortField';
import type { Trait } from 'src/api/models/trait';
import { ButtonGroup } from 'src/components/ButtonGroup/ButtonGroup';
import { ControlWrapper } from 'src/components/controls/ControlWrapper';
import { SortDirectionControl } from 'src/components/controls/SortDirection';
import { TextInput } from 'src/components/controls/TextInput';
import { Field } from 'src/components/Field/Field';
import { Icon } from 'src/components/Icon/Icon';
import { IconButton } from 'src/components/IconButton/IconButton';
import { Select } from 'src/components/Select';
import { useDebounce } from 'src/hooks/useDebounce';
import { useTraitsQuery } from '../../queries/traits';
import { useVnsQuery } from '../../queries/vns';
import { SearchPopover } from '../SearchPopover/SearchPopover';
import type { CharacterSearchFormValues } from './characterSearchFormValues';

const characterRoleOptions = CHARACTER_ROLES
  .map(role => ({ label: CharacterRole.toReadable(role), value: role }));

const genderOptions = GENDERS
  .map(gender => ({ label: Gender.toReadable(gender), value: gender }));

const sortFieldOptions = CHARACTER_SORT_FIELDS
  .map(field => ({ label: CharacterSortField.toReadable(field), value: field }));

/** Character search form. */
const CharacterSearchFormComponent: FC = () => {
  const { control } = useFormContext<CharacterSearchFormValues>();

  const [traitsSearchInput, setTraitsSearchInput] = useState('');
  const debouncedTraitsSearchInput = useDebounce(traitsSearchInput);

  const [vnsSearchInput, setVnsSearchInput] = useState('');
  const debouncedVnsInput = useDebounce(vnsSearchInput);

  const {
    data: traits,
    fetchNextPage: fetchTraits,
    isRefetching: isRefetchingTraits,
    isFetching: isFetchingTraits,
  } = useTraitsQuery(debouncedTraitsSearchInput);

  const {
    data: vns,
    fetchNextPage: fetchVns,
    isRefetching: isRefetchingVns,
    isFetching: isFetchingVns,
  } = useVnsQuery({ search: debouncedVnsInput });

  const handleTraitsInputChange = useCallback((value: string) => {
    setTraitsSearchInput(value);
  }, []);

  const handleFetchMoreTraits = useCallback(() => {
    if (Pagination.hasMore(traits)) {
      fetchTraits();
    }
  }, [traits]);

  const handleVnsInputChange = useCallback((value: string) => {
    setVnsSearchInput(value);
  }, []);

  const handleFetchMoreVns = useCallback(() => {
    if (Pagination.hasMore(vns)) {
      fetchVns();
    }
  }, [vns]);

  const vnOptions = useMemo(() => vns?.pages
    .flatMap(page => page.results)
    .map(vn => ({ value: vn.id, label: vn.title })) ?? [], [vns]);

  const traitOptions = useMemo(() => {
    const traitResults = traits?.pages.flatMap(page => page.results) ?? [];

    const groupedTraitsByName = traitResults.reduce((prev, cur) => {
      if (cur.parent === null) {
        return { ...prev, [cur.name]: [] };
      }

      // This excludes subparent traits(hair color, etc.)
      if (!cur.isApplicable || !cur.isSearchable) {
        return prev;
      }
      return { ...prev, [cur.parent.name]: [...prev[cur.parent.name] ?? [], cur] };
    }, {} as Record<string, Trait[]>);

    return Object.entries(groupedTraitsByName)
      .map(([key, ts]) => ({ label: key, options: ts.map(t => ({ label: t.name, value: t.id })) }));
  }, [traits]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-1 items-end gap-4">
        <ControlWrapper>
          <TextInput
            name="search"
            control={control}
            placeholder="Search"
            leftElement={<Icon name="search" />}
          />
        </ControlWrapper>

        <div className="w-full">
          <ControlWrapper label="Character roles">
            <Field
              Component={Select}
              control={control}
              placeholder="Select character roles"
              options={characterRoleOptions}
              isClearable
              isMulti
              name="roles"
            />
          </ControlWrapper>
        </div>

        {traits !== undefined && (
          <div className="w-full">
            <ControlWrapper label="Traits">
              <Field
                Component={Select}
                control={control}
                placeholder="Select traits"
                onInputChange={handleTraitsInputChange}
                onMenuScrollToBottom={handleFetchMoreTraits}
                isLoading={isRefetchingTraits || isFetchingTraits}
                options={traitOptions}
                isClearable
                isMulti
                name="traits"
              />
            </ControlWrapper>
          </div>
        )}

        {vns !== undefined && (
          <div className="w-full">
            <ControlWrapper label="Visual novel">
              <Field
                Component={Select}
                control={control}
                placeholder="Select visual novel"
                onInputChange={handleVnsInputChange}
                onMenuScrollToBottom={handleFetchMoreVns}
                isLoading={isRefetchingVns || isFetchingVns}
                options={vnOptions}
                closeMenuOnSelect
                isClearable
                name="vn"
              />
            </ControlWrapper>
          </div>
        )}

        <SearchPopover>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="w-full">
                <ControlWrapper label="Gender">
                  <Field
                    Component={Select}
                    control={control}
                    placeholder="Select gender"
                    options={genderOptions}
                    isClearable
                    closeMenuOnSelect
                    disableSearch
                    name="gender"
                  />
                </ControlWrapper>
              </div>
            </div>
          </div>
        </SearchPopover>

      </div>
      <div className="ml-auto flex gap-4">
        <div className="flex">
          <SortDirectionControl control={control} name="sortDirection" />
          <Field
            Component={Select}
            control={control}
            options={sortFieldOptions}
            closeMenuOnSelect
            name="sortField"
            className="rounded-r-md bg-gray-100"
            disableSearch
          />
        </div>

        <ButtonGroup>
          <IconButton intent="tertiary" name="rectangle-stack" />
          <IconButton intent="tertiary" name="squares" />
        </ButtonGroup>
      </div>
    </div>
  );
};

export const CharacterSearchForm = memo(CharacterSearchFormComponent);
