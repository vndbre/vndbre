import type { FC } from 'react';
import { useCallback, useState, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { CharacterRole, CHARACTER_ROLES } from 'src/api/models/character/characterRole';
import { Gender, GENDERS } from 'src/api/models/character/gender';
import { ControlWrapper } from 'src/components/controls/ControlWrapper';
import { TextInput } from 'src/components/controls/TextInput';
import { Field } from 'src/components/Field/Field';
import { Icon } from 'src/components/Icon/Icon';
import { Select } from 'src/components/Select';
import { useDebounce } from 'src/hooks/useDebounce';
import { useVnsQuery } from '../../queries/vns';
import type { CharacterSearchFormValues } from './characterSearchFormValues';

const characterRoleOptions = CHARACTER_ROLES
  .map(role => ({ label: CharacterRole.toReadable(role), value: role }));

const genderOptions = GENDERS
  .map(gender => ({ label: Gender.toReadable(gender), value: gender }));

/** Character search form. */
const CharacterSearchFormComponent: FC = () => {
  const { control } = useFormContext<CharacterSearchFormValues>();

  const [vnsInput, setVnsInput] = useState('');
  const debouncedVnsInput = useDebounce(vnsInput);

  const {
    data: vns,
    fetchNextPage: fetchVns,
    isRefetching: isRefetchingVns,
    isFetching: isFetchingVns,
  } = useVnsQuery({ search: debouncedVnsInput });

  const handleVnsInputChange = useCallback((value: string) => {
    setVnsInput(value);
  }, []);

  const handleFetchMoreVns = useCallback(() => {
    if (vns?.pages.at(-1)?.hasMore) {
      fetchVns();
    }
  }, [vns]);

  const vnOptions = vns?.pages
    .flatMap(page => page.results)
    .map(vn => ({ value: vn.id, label: vn.title })) ?? [];

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

        {vns && (
          <div className="w-full">
            <ControlWrapper label="Visual novel">
              <Field
                Component={Select}
                control={control}
                placeholder="Select tags"
                onInputChange={handleVnsInputChange}
                onMenuScrollToBottom={handleFetchMoreVns}
                isLoading={isRefetchingVns || isFetchingVns}
                options={vnOptions}
                isClearable
                name="vn"
              />
            </ControlWrapper>
          </div>
        )}

        {/* <VnSearchPopover>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
              <ControlWrapper label="Original Language">
                <Field
                  Component={LanguageSelect}
                  control={control}
                  name="originalLanguage"
                  placeholder="Select languages"
                  closeMenuOnSelect
                  isClearable
                />
              </ControlWrapper>
              <ControlWrapper label="Development status">
                <Field
                  Component={Select}
                  control={control}
                  name="developmentStatus"
                  placeholder="Select development status"
                  options={devStatusOptions}
                  closeMenuOnSelect
                  disableSearch
                  isClearable
                />
              </ControlWrapper>
              <ControlWrapper label="Length">
                <Field
                  Component={Select}
                  control={control}
                  name="length"
                  placeholder="Select length"
                  options={lengthOptions}
                  closeMenuOnSelect
                  disableSearch
                  isClearable
                />
              </ControlWrapper>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field
                Component={Slider}
                control={control}
                name="released"
                label="Release Date"
                showValues
                min={1980}
                max={new Date().getFullYear()}
              />
              <Field
                Component={Slider}
                name="rating"
                control={control}
                label="Rating"
                showValues
                min={10}
                max={100}
              />
              <Field
                Component={Slider}
                name="popularity"
                control={control}
                label="Popularity"
                showValues
                min={0}
                max={100}
              />
            </div>
          </div>
        </VnSearchPopover>

      </div>

      <div className="ml-auto flex gap-4">
        <div className="flex">
          <Controller
            control={control}
            name="sortDirection"
            render={({ field: { onChange, value } }) => (
              <IconButton
                className="rounded-r-none"
                intent="tertiary"
                name={`sort-${value}`}
                onClick={() => onChange(value === 'asc' ? 'desc' : 'asc')}
              />
            )}
          />
          <Field
            Component={Select}
            control={control}
            options={sortFieldOptions}
            closeMenuOnSelect
            name="sortField"
            className="rounded-r bg-gray-100"
            disableSearch
          />
        </div>

        <ButtonGroup>
          <IconButton intent="tertiary" name="rectangle-stack" />
          <IconButton intent="tertiary" name="squares" />
        </ButtonGroup> */}
      </div>
    </div>
  );
};

export const CharacterSearchForm = memo(CharacterSearchFormComponent);
