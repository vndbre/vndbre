/* eslint-disable jsdoc/require-jsdoc */
import type { FC } from 'react';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'src/hooks/useDebounce';
import { Paginator } from 'src/components/Paginator/Paginator';
import { Card } from 'src/components/Card/Card';
import type { InfiniteData } from '@tanstack/react-query';
import type { Pagination } from 'src/api/models/pagination';
import type { Vn } from 'src/api/models/vn/vn';
import { CardSkeleton } from 'src/components/Card/CardSkeleton';
import { Form } from 'src/components/Form/Form';
import { useVnsQuery } from '../../queries/vns';
import type { VnSearchFormValues } from '../VnSearchForm/vnSearchFormValues';
import { vnSearchInitialValues, mapVnSearchFormValuesToQueryOptions } from '../VnSearchForm/vnSearchFormValues';
import { VnSearchForm } from '../VnSearchForm/VnSearchForm';

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
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm({ defaultValues: vnSearchInitialValues });
  const { control } = methods;

  const formData = useWatch({ control }) as VnSearchFormValues;
  const debouncedFormData = useDebounce(formData, 1000);

  const {
    fetchNextPage: fetchVns,
    data: vns,
    isFetchingNextPage: isFetchingVns,
  } = useVnsQuery(mapVnSearchFormValuesToQueryOptions(debouncedFormData));

  useEffect(() => {
    setCurrentPage(1);
  }, [formData]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    fetchVns({ pageParam: newPage });
  }, []);

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Form {...methods}>
        <VnSearchForm />
      </Form>
      <div className="grid grid-cols-6 gap-4">
        {vns !== undefined && !isFetchingVns ?
          getPageData(vns, currentPage).map(vn => (
            <Card key={vn.title} title={vn.title} imageUrl={vn.image?.url} />
          )) : [...Array(18).keys()].map(i => (
            <CardSkeleton key={i} />
          ))}
      </div>
      {vns?.pages[0]?.count != null && (
        <div className="mt-auto flex w-full justify-center">
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
