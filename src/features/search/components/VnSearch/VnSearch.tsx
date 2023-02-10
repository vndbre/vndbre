import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import React, { useState, useCallback, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { MultiValue } from 'react-select';
import { ControlWrapper } from 'src/components/controls/ControlWrapper';
import { TextInput } from 'src/components/controls/TextInput';
import { Icon } from 'src/components/Icon/Icon';
import { IconButton } from 'src/components/IconButton/IconButton';
import { LanguageSelect } from 'src/components/LanguageSelect/LanguageSelect';
import { PlatformSelect } from 'src/components/PlatformSelect/PlatformSelect';
import { Slider } from 'src/components/Slider/Slider';
import type { SelectOption } from 'src/components/Select';
import { Select } from 'src/components/Select';
import { useDebounce } from 'src/hooks/useIntersectionObserver';
import { Button } from 'src/components/Button/Button';
import { Paginator } from 'src/components/Paginator/Paginator';
import { VnService } from 'src/api/services/vnService';
import { useTagsQuery } from '../../queries/tag';

interface SearchFormValues {
  readonly search: string;
  readonly languages: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly platforms: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly tags: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly length: number[];
}

const searchFormInitialValues: SearchFormValues = {
  search: '',
  languages: [],
  platforms: [],
  tags: [],
  length: [0, 100],
};

/** Visual novel overview tab. */
const VnSearchComponent: FC = () => {
  const [tagsInputValue, setTagsInputValue] = useState('');
  const debouncedValue = useDebounce(tagsInputValue, 1000);

  const { fetchNextPage, data: tags, isRefetching, isFetching } = useTagsQuery(debouncedValue);
  const {
    control,
    handleSubmit,
  } = useForm({ defaultValues: searchFormInitialValues, mode: 'onBlur' });

  const handleFormSubmit = useCallback((data: SearchFormValues) => {
    console.log(data);
  }, []);

  const handleFetchMoreTags = useCallback(() => {
    if (tags?.pages.at(-1)?.hasMore) {
      fetchNextPage();
    }
  }, [tags]);

  const handleTagInputChange = useCallback((value: string) => {
    setTagsInputValue(value);
  }, []);

  const tagOptions = tags?.pages
    .flatMap(page => page.results)
    .map(tag => ({ label: tag.name, value: tag.id })) ?? [];

  const [page, setPage] = useState(1);

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex w-full flex-1 items-end gap-4">
          <ControlWrapper>
            <TextInput name="search" control={control} placeholder="Search" leftElement={<Icon name="search" />} />
          </ControlWrapper>
          <div className="w-full">
            <Controller
              control={control}
              name="languages"
              render={({ field: { name, onChange, onBlur, value, ref } }) => (
                <ControlWrapper label="Language">
                  <LanguageSelect
                    searchRef={ref}
                    placeholder="Select languages"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    isMulti
                    name={name}
                  />
                </ControlWrapper>
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="platforms"
              render={({ field: { name, onChange, onBlur, value, ref } }) => (
                <ControlWrapper label="Platform">
                  <PlatformSelect
                    placeholder="Select platforms"
                    searchRef={ref}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    isMulti
                    name={name}

                  />
                </ControlWrapper>
              )}
            />
          </div>
          {tags && (
            <div className="w-full">
              <Controller
                control={control}
                name="tags"
                render={({ field: { name, onChange, onBlur, value, ref } }) => (
                  <ControlWrapper label="Tags">
                    <Select
                      placeholder="Select tags"
                      searchRef={ref}
                      value={value}
                      onBlur={onBlur}
                      onInputChange={handleTagInputChange}
                      onMenuScrollToBottom={handleFetchMoreTags}
                      onChange={onChange}
                      isLoading={isRefetching || isFetching}
                      options={tagOptions}
                      isMulti
                      name={name}
                    />
                  </ControlWrapper>
                )}
              />
            </div>
          )}
          <IconButton onClick={() => VnService.getVns({ id: 'v11', results: 1 })} intent="tertiary" name="options" className="shrink-0" />
        </div>
        <Button type="submit" className="mb-8">test</Button>
        <Controller
          name="length"
          control={control}
          render={({ field: { name, onChange, ref, value } }) => (
            <Slider
              name={name}
              onChange={onChange}
              label="Length"
              showValues
              ref={ref}
              value={value}
              min={0}
              max={100}
            />
          )}
        />
      </form>
      <div>
        <div>test</div>
      </div>
      <div className="mt-6 flex w-full justify-center">
        <Paginator count={131} currentPage={page} onChange={setPage} />
      </div>
    </div>
  );
};

export const VnSearch = memo(VnSearchComponent);
