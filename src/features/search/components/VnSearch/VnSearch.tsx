/* eslint-disable jsdoc/require-jsdoc */
import type { FC } from 'react';
import React, { useMemo, useEffect, useState, useCallback, memo } from 'react';
import { useForm } from 'react-hook-form';
import type { MultiValue, SingleValue } from 'react-select';
import { ControlWrapper } from 'src/components/controls/ControlWrapper';
import { TextInput } from 'src/components/controls/TextInput';
import { Icon } from 'src/components/Icon/Icon';
import { LanguageSelect } from 'src/components/LanguageSelect/LanguageSelect';
import { PlatformSelect } from 'src/components/PlatformSelect/PlatformSelect';
import type { SelectOption } from 'src/components/Select';
import { Select } from 'src/components/Select';
import { useDebounce } from 'src/hooks/useIntersectionObserver';
import { Paginator } from 'src/components/Paginator/Paginator';
import { Card } from 'src/components/Card/Card';
import type { InfiniteData } from '@tanstack/react-query';
import type { Pagination } from 'src/api/models/pagination';
import type { Vn } from 'src/api/models/vn/vn';
import { CardSkeleton } from 'src/components/Card/CardSkeleton';
import { Field } from 'src/components/Field/Field';
import { Slider } from 'src/components/Slider/Slider';
import { useVnsQuery } from '../../queries/vns';
import { useTagsQuery } from '../../queries/tag';
import { VnSearchPopover } from './VnSearchPopover/VnSearchPopover';

interface SearchFormValues {
  readonly search: string;
  readonly languages: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly originalLanguage: SingleValue<Omit<SelectOption, 'icon'>>;
  readonly platforms: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly tags: MultiValue<Omit<SelectOption, 'icon'>>;
  readonly length: [number];
  readonly popularity: [number, number];
  readonly released: [number, number];
  readonly rating: [number, number];

}

const searchFormInitialValues: SearchFormValues = {
  search: '',
  languages: [],
  platforms: [],
  tags: [],
  originalLanguage: null,
  length: [1],
  popularity: [0, 100],
  released: [1980, new Date().getFullYear()],
  rating: [10, 100],
};

/**
 * Gets vns for a specific page.
 * @param data Paginated data.
 * @param page Page.
 * @returns List of vns.
 */
const getPageData = (data: InfiniteData<Pagination<Vn>>, page: number): Vn[] => {
  const pageParam = data.pageParams.indexOf(page);
  const index = pageParam === -1 ? 0 : pageParam;
  return data.pages[index]?.results as Vn[] ?? [];
};

/** Visual novel overview tab. */
const VnSearchComponent: FC = () => {
  const {
    control,
    handleSubmit,
    watch,
  } = useForm({ defaultValues: searchFormInitialValues });

  const [tagsInputValue, setTagsInputValue] = useState('');
  const debouncedTagInputValue = useDebounce(tagsInputValue, 1000);

  const [currentPage, setCurrentPage] = useState(1);

  const formData = useMemo(() => watch(), []);
  const debouncedFormData = useDebounce(formData, 1000);

  const {
    fetchNextPage: fetchMoreTags,
    data: tags,
    isRefetching: isRefetchingTags,
    isFetching: isFetchingTags,
  } = useTagsQuery(debouncedTagInputValue);

  const {
    fetchNextPage: fetchVns,
    data: vns,
    isFetchingNextPage: isFetchingVns,
  } = useVnsQuery({
    search: debouncedFormData.search,
    platforms: debouncedFormData.platforms.map(p => p.value),
    languages: debouncedFormData.languages.map(l => l.value),
    originalLanguage: debouncedFormData.originalLanguage?.value,
    tags: debouncedFormData.tags.map(t => t.value),
    popularity: { start: debouncedFormData.popularity[0], end: debouncedFormData.popularity[1] },
    released: { start: debouncedFormData.released[0], end: debouncedFormData.released[1] },
    length: debouncedFormData.length[0],
    rating: { start: debouncedFormData.rating[0], end: debouncedFormData.rating[1] },

  // eslint-disable-next-line jsdoc/require-jsdoc
  });

  useEffect(() => {
    console.log('test');
    setCurrentPage(1);
  }, [debouncedFormData]);

  const handleFormSubmit = useCallback((data: SearchFormValues) => {
    console.log(data);
  }, []);

  const handleFetchMoreTags = useCallback(() => {
    if (tags?.pages.at(-1)?.hasMore) {
      fetchMoreTags();
    }
  }, [tags]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    fetchVns({ pageParam: newPage });
  }, []);

  const handleTagInputChange = useCallback((value: string) => {
    setTagsInputValue(value);
  }, []);

  const tagOptions = tags?.pages
    .flatMap(page => page.results)
    .map(tag => ({ label: tag.name, value: tag.id })) ?? [];

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex w-full flex-1 items-end gap-4">
          <ControlWrapper>
            <TextInput name="search" control={control} placeholder="Search" leftElement={<Icon name="search" />} />
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
          <VnSearchPopover>
            <div className="flex flex-col gap-8">
              <ControlWrapper label="Original Language">
                <Field
                  Component={LanguageSelect}
                  control={control}
                  name="originalLanguage"
                  placeholder="Select languages"
                />
              </ControlWrapper>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  Component={Slider}
                  control={control}
                  name="length"
                  label="Length"
                  showValues
                  min={1}
                  max={5}
                />
                <Field
                  Component={Slider}
                  control={control}
                  name="released"
                  label="Release Date"
                  showValues
                  min={1980}
                  max={2023}
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
      </form>
      <div className="grid grid-cols-6 gap-4">
        {vns && !isFetchingVns ?
          getPageData(vns, currentPage).map(vn => (
            <Card key={vn.title} title={vn.title} imageUrl={vn.image?.url} />
          )) : [...Array(18).keys()].map(i => (
            <CardSkeleton key={i} />
          ))}
      </div>
      {vns?.pages[0]?.count && (
        <div className="mt-6 flex w-full justify-center">
          <Paginator
            count={vns?.pages[0]?.count}
            currentPage={currentPage}
            pageSize={18}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export const VnSearch = memo(VnSearchComponent);
