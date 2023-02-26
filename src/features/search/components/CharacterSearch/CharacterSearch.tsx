import type { FC } from 'react';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { Paginator } from 'src/components/Paginator/Paginator';
import { Card } from 'src/components/Card/Card';
import { CardSkeleton } from 'src/components/Card/CardSkeleton';
import { ChildrenMultiplier } from 'src/components/ChildrenMultiplier/ChildrenMultiplier';
import { Pagination } from 'src/api/models/pagination';
import { useDebounce } from 'src/hooks/useDebounce';
import { useForm, useWatch } from 'react-hook-form';
import { Form } from 'src/components/Form/Form';
import { DEFAULT_PAGE_SIZE, useCharactersQuery } from '../../queries/characters';
import { CharacterSearchFormValues, CHARACTER_SEARCH_INITIAL_VALUES } from '../CharacterSearchForm/characterSearchFormValues';
import { CharacterSearchForm } from '../CharacterSearchForm/CharacterSearchForm';
import { EmptyPlaceholder } from '../EmptyPlaceholder/EmptyPlaceholder';

/** Visual novel overview tab. */
const CharacterSearchComponent: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm({ defaultValues: CHARACTER_SEARCH_INITIAL_VALUES });
  const { control } = methods;

  const formData = useWatch({ control }) as CharacterSearchFormValues;
  const debouncedFormData = useDebounce(formData);

  const {
    fetchNextPage: fetchCharacters,
    data: characters,
    isFetching,
    isLoading,
  } = useCharactersQuery(CharacterSearchFormValues.toQueryOptions(debouncedFormData));

  useEffect(() => {
    setCurrentPage(1);
  }, [formData]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    fetchCharacters({ pageParam: newPage });
  }, []);

  const characterCards = characters !== undefined &&
    Pagination.getPageData(characters, currentPage).map(character => (
      <Card
        key={character.id}
        title={character.name}
        imageUrl={character.image?.url}

        // TODO: FIX IT
        path={`/character/${character.id}/overview`}
      />
    ));

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Form {...methods}>
        <CharacterSearchForm />
      </Form>

      <div className="grid grid-cols-6 gap-4">
        {!isFetching ? characterCards : (
          <ChildrenMultiplier amount={DEFAULT_PAGE_SIZE}>
            <CardSkeleton />
          </ChildrenMultiplier>
        )}
      </div>

      {/* TODO: Add placeholder for empty response. */}
      {Pagination.getCount(characters) === 0 && (
        <EmptyPlaceholder />
      )}

      {Pagination.getCount(characters) !== 0 && !isLoading && (
        <div className="mt-auto flex w-full justify-center">
          <Paginator
            count={Pagination.getCount(characters)}
            currentPage={currentPage}
            pageSize={DEFAULT_PAGE_SIZE}
            onChange={handlePageChange}
          />
        </div>
      )}

    </div>
  );
};

export const CharacterSearch = memo(CharacterSearchComponent);
