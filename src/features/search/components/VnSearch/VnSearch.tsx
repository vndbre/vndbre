import type { FC } from 'react';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import { Paginator } from 'src/components/Paginator/Paginator';
import { Card } from 'src/components/Card/Card';
import { CardSkeleton } from 'src/components/Card/CardSkeleton';
import { Form } from 'src/components/Form/Form';
import { ChildrenMultiplier } from 'src/components/ChildrenMultiplier/ChildrenMultiplier';
import { Pagination } from 'src/api/models/pagination';
import { useCensor } from 'src/hooks/useCensor';
import { DEFAULT_PAGE_SIZE, useVnsQuery } from '../../queries/vns';
import { VnSearchFormValues, VN_SEARCH_INITIAL_VALUES } from '../VnSearchForm/vnSearchFormValues';
import { VnSearchForm } from '../VnSearchForm/VnSearchForm';
import { EmptyPlaceholder } from '../EmptyPlaceholder/EmptyPlaceholder';

/** Visual novel overview tab. */
const VnSearchComponent: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { shouldBlurImage } = useCensor();

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

  const vnCards = vns !== undefined && Pagination.getPageData(vns, currentPage).map(vn => (
    <Card
      key={vn.id}
      title={vn.title}
      imageUrl={vn.image?.url}
      isBlurred={shouldBlurImage(vn.image)}

      // TODO: Fix link once page will be implemented
      path={`/vn/${vn.id}/overview`}
    />
  ));

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Form {...methods}>
        <VnSearchForm />
      </Form>

      <div className="grid grid-cols-6 gap-4">
        {isFetching && (
          <ChildrenMultiplier amount={DEFAULT_PAGE_SIZE}>
            <CardSkeleton />
          </ChildrenMultiplier>
        )}

        {!isFetching && vnCards}
      </div>

      {/* TODO: Add placeholder for empty response. */}
      {Pagination.getCount(vns) === 0 && (
        <EmptyPlaceholder />
      )}

      {Pagination.getCount(vns) !== 0 && !isLoading && (
        <div className="mt-auto flex w-full justify-center">
          <Paginator
            count={Pagination.getCount(vns)}
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
