import type { FC } from 'react';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'src/hooks/useDebounce';
import { Paginator } from 'src/components/Paginator/Paginator';
import { Card } from 'src/components/Card/Card';
import { CardSkeleton } from 'src/components/Card/CardSkeleton';
import { Form } from 'src/components/Form/Form';
import { List } from 'src/components/List/List';
import { PaginationService } from 'src/api/services/paginationService';
import { DEFAULT_PAGE_SIZE, useVnsQuery } from '../../queries/vns';
import { VnSearchFormValues, VN_SEARCH_INITIAL_VALUES } from '../VnSearchForm/vnSearchFormValues';
import { VnSearchForm } from '../VnSearchForm/VnSearchForm';

/** Visual novel overview tab. */
const VnSearchComponent: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm({ defaultValues: VN_SEARCH_INITIAL_VALUES });
  const { control } = methods;

  const formData = useWatch({ control }) as VnSearchFormValues;
  const debouncedFormData = useDebounce(formData);

  const {
    fetchNextPage: fetchVns,
    data: vns,
    isFetching,
    isLoading,
  } = useVnsQuery(VnSearchFormValues.toQueryOptions(debouncedFormData));
  useEffect(() => {
    setCurrentPage(1);
  }, [formData]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    fetchVns({ pageParam: newPage });
  }, []);

  const vnCards = vns !== undefined && PaginationService.getPageData(vns, currentPage).map(vn => (
    <Card
      key={vn.id}
      title={vn.title}
      imageUrl={vn.image?.url}

      // TODO: FIX IT
      path={`/vn/${vn.id}/overview`}
    />
  ));

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Form {...methods}>
        <VnSearchForm />
      </Form>

      <div className="grid grid-cols-6 gap-4">
        {!isFetching ? vnCards : (
          <List size={DEFAULT_PAGE_SIZE}>
            <CardSkeleton />
          </List>
        )}
      </div>

      {/* TODO: Add placeholder for empty response. */}
      {vns?.pages.at(-1)?.count === 0 && (
        <div className="flex flex-col items-center">
          <h2>УВЫ</h2>
        </div>
      )}

      {vns?.pages[0]?.count != null && !isLoading && (
        <div className="mt-auto flex w-full justify-center">
          <Paginator
            count={vns?.pages[0]?.count}
            currentPage={currentPage}
            pageSize={DEFAULT_PAGE_SIZE}
            onChange={handlePageChange}
          />
        </div>
      )}

    </div>
  );
};

export const VnSearch = memo(VnSearchComponent);
