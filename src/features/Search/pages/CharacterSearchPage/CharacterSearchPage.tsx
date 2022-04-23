import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { useCharactersPageQuery } from '../../../VisualNovel/queries/characters';
import { CharacterSearchOptions } from '../../../../api/services/charactersService';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { CharacterFormData, CharacterSearchForm } from '../../components/CharacterSearchForm/CharacterSearchForm';

const PREVIEW_PAGINATION_DEFAULTS: CharacterSearchOptions = {
  page: 1,
  pageSize: 24,
};

type CharacterFormDataSearchOptions = Omit<CharacterSearchOptions, 'page' | 'pageSize'>;

/**
 * Maps character form data to search options.
 * @param formData Form data.
 */
const mapFormDataToOptions = (formData: CharacterFormData): CharacterFormDataSearchOptions => ({
  search: formData.search,
});

/**
 * Maps character search options to form data representation.
 * @param options Options.
 */
const mapOptionsToFormData = (options: CharacterFormDataSearchOptions): Partial<CharacterFormData> => ({
  ...(options.search == null ? null : { search: options.search }),
});

/** Search page for characters. */
export const CharacterSearchPage: VFC = () => {
  const [searchOptions, setSearchOptions] = useState<CharacterSearchOptions>(PREVIEW_PAGINATION_DEFAULTS);
  const { isLoading, data: charactersPage } = useCharactersPageQuery(searchOptions);

  const handlePaginatorChange = useCallback((newPage: number) => {
    setSearchOptions(prev => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  const handleSearchSubmit = useCallback((data: CharacterFormData) => {
    setSearchOptions(prev => ({
      ...prev,
      ...mapFormDataToOptions(data),
      page: 1,
    }));
  }, []);

  const formDefaultValue = useMemo(() => mapOptionsToFormData(PREVIEW_PAGINATION_DEFAULTS), []);

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
        defaultFormValues={formDefaultValue}
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
