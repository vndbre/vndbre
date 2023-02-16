import type { z } from 'zod';
import type { PaginationDto } from '../dtos/paginationDto';
import type { Pagination } from '../models/pagination';

type MapperFn<T extends z.ZodTypeAny, R> = (data: z.infer<T>) => R;

export namespace PaginationMapper {

  /**
   *
   * @param dto Pagination dto.
   * @param schema Schema for results data.
   * @param mapper Mapper for results.
   */
  export function fromDto<T extends z.ZodTypeAny, R>(
    dto: PaginationDto<T>,
    mapper: MapperFn<T, R>,
  ): Pagination<R> {
    return {
      count: dto.count,
      hasMore: dto.more,
      results: dto.results.map(mapper),
    };
  }
}
