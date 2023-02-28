import type { FC } from 'react';
import { useMemo, memo, useCallback, useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { Pagination } from 'src/api/models/pagination';
import { VnSortField, VN_SORT_FIELDS } from 'src/api/models/queryOptions/vn/vnSortField';
import { VnDevelopmentStatus, VN_DEV_STATUSES } from 'src/api/models/vn/developmentStatus';
import { VnLength, VN_LENGTHS } from 'src/api/models/vn/length';
import { ButtonGroup } from 'src/components/ButtonGroup/ButtonGroup';
import { ControlWrapper } from 'src/components/ControlWrapper/ControlWrapper';
import { SortDirectionControl } from 'src/components/SortDirection/SortDirection';
import { Field } from 'src/components/Field/Field';
import { Icon } from 'src/components/Icon/Icon';
import { IconButton } from 'src/components/IconButton/IconButton';
import { LanguageSelect } from 'src/components/LanguageSelect/LanguageSelect';
import { PlatformSelect } from 'src/components/PlatformSelect/PlatformSelect';
import { Select } from 'src/components/Select';
import { Slider } from 'src/components/Slider/Slider';
import { TextInput } from 'src/components/TextInput/TextInput';
import { useDebounce } from 'usehooks-ts';
import { useTagsQuery } from '../../queries/tags';
import { SearchPopover } from '../SearchPopover/SearchPopover';
import type { VnSearchFormValues } from './vnSearchFormValues';

const sortFieldOptions = VN_SORT_FIELDS
  .map(field => ({ value: field, label: VnSortField.toReadable(field) }));

const devStatusOptions = VN_DEV_STATUSES
  .map(status => ({ value: status, label: VnDevelopmentStatus.toReadable(status) }));

const lengthOptions = VN_LENGTHS
  .map(length => ({ value: length, label: VnLength.toReadable(length) }));

/** Search form component for vns. */
const VnSearchFormComponent: FC = () => {
  const [tagsInputValue, setTagsInputValue] = useState('');
  const debouncedTagInputValue = useDebounce(tagsInputValue);

  const { control } = useFormContext<VnSearchFormValues>();
  const {
    fetchNextPage: fetchMoreTags,
    data: tags,
    isRefetching: isRefetchingTags,
    isFetching: isFetchingTags,
  } = useTagsQuery(debouncedTagInputValue);

  const handleFetchMoreTags = useCallback(() => {
    if (Pagination.hasMore(tags)) {
      fetchMoreTags();
    }
  }, [tags]);

  const handleTagInputChange = useCallback((value: string) => {
    setTagsInputValue(value);
  }, []);

  const tagOptions = useMemo(() =>
    tags?.pages
      .flatMap(page => page.results)
      .map(tag => ({ label: tag.name, value: tag.id })) ?? [], [tags]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-1 items-end gap-4">
        <ControlWrapper>
          <Field
            Component={TextInput}
            control={control}
            name="search"
            placeholder="Search"
            leftElement={<Icon name="search" />}
          />
        </ControlWrapper>
        <div className="w-full">
          <ControlWrapper label="Language">
            <Field
              Component={LanguageSelect}
              isMulti
              control={control}
              name="languages"
              placeholder="Select languages"
            />
          </ControlWrapper>
        </div>

        <div className="w-full">
          <ControlWrapper label="Platform">
            <Field
              Component={PlatformSelect}
              isMulti
              control={control}
              name="platforms"
              placeholder="Select platforms"
            />
          </ControlWrapper>
        </div>
        {tags && (
          <div className="w-full">
            <ControlWrapper label="Tags">
              <Field
                Component={Select}
                control={control}
                placeholder="Select tags"
                onInputChange={handleTagInputChange}
                onMenuScrollToBottom={handleFetchMoreTags}
                isLoading={isRefetchingTags || isFetchingTags}
                options={tagOptions}
                isMulti
                name="tags"
              />
            </ControlWrapper>
          </div>
        )}

        <SearchPopover>
          <div className="flex flex-col gap-8 pb-1">
            <div className="grid grid-cols-1 gap-4">
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
            <div className="grid grid-cols-1 gap-4">
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
            className="min-w-[120px] rounded-l-none"
            disableSearch
            size="sm"
          />
        </div>

        <ButtonGroup intent="tertiary" size="sm" isDisabled>
          <IconButton name="rectangle-stack" />
          <IconButton name="squares" />
        </ButtonGroup>
      </div>
    </div>
  );
};

export const VnSearchForm = memo(VnSearchFormComponent);
