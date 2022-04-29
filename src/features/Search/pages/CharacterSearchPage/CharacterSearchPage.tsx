import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { useCharactersPageQuery } from '../../../VisualNovel/queries/characters';
import { CharacterSearchOptions } from '../../../../api/services/charactersService';
import { CharacterList } from './components/CharacterList/CharacterList';
import { CharacterFormData, CharacterSearchForm } from './components/CharacterSearchForm/CharacterSearchForm';
import { useCharacterQueryParams } from '../../hooks/useCharacterQueryParams';

const DEFAULT_PAGINATION_OPTIONS: CharacterSearchOptions = {
  page: 1,
  pageSize: 24,
};

type CharacterFormDataSearchOptions = Omit<CharacterSearchOptions, 'page' | 'pageSize'>;

/**
 * Maps character form data to search options.
 * @param formData Form data.
 */
function mapFormDataToOptions(formData: CharacterFormData): CharacterFormDataSearchOptions {
  return {
    search: formData.search,
  };
}

/**
 * Maps character search options to form data representation.
 * @param options Options.
 */
function mapOptionsToFormData(options: CharacterFormDataSearchOptions): Partial<CharacterFormData> {
  return {
    ...(options.search == null ? null : { search: options.search }),
  };
}

/** Search page for characters. */
export const CharacterSearchPage: VFC = () => {
  const [queryParams, setQueryParams] = useCharacterQueryParams();

  const defaultSearchOptions: CharacterSearchOptions = useMemo(() => ({
    ...DEFAULT_PAGINATION_OPTIONS,
    ...queryParams,
  }), []);

  const [searchOptions, setSearchOptions] = useState<CharacterSearchOptions>(defaultSearchOptions);
  const { isLoading, data: charactersPage } = useCharactersPageQuery(searchOptions);

  const handlePaginatorChange = useCallback((newPage: number) => {
    setSearchOptions(prev => ({
      ...prev,
      page: newPage,
    }));

    setQueryParams({
      ...searchOptions,
      page: newPage,
    });
  }, [searchOptions]);

  const handleSearchSubmit = useCallback((data: CharacterFormData) => {
    const options = mapFormDataToOptions(data);

    setSearchOptions(prev => ({
      ...prev,
      ...options,
      page: 1,
    }));

    setQueryParams({
      ...options,
      page: 1,
    });
  }, []);

  const defaultFormValues = useMemo(() => mapOptionsToFormData(defaultSearchOptions), []);

  const page = useMemo(() => searchOptions.page, [searchOptions.page]);
  const pageCount = useMemo(() => (charactersPage?.hasMore ? page + 1 : page), [searchOptions.page, charactersPage?.hasMore]);

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
      px={10}
      gap={8}
    >
      <CharacterSearchForm
        defaultFormValues={defaultFormValues}
        onSubmit={handleSearchSubmit}
      />

      <CharacterList
        variant="cards"
        isLoading={isLoading}
        items={charactersPage?.items ?? []}
      />

      <Box alignSelf="center">
        <Paginator
          isCountLoading={isLoading}
          isNavigationHidden
          count={pageCount}
          currentPage={page}
          onChange={handlePaginatorChange}
        />
      </Box>
    </Box>
  );
};
