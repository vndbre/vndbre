import { PaginationOptions } from '../../models/paginationOptions';
import { Pagination } from '../../models/pagination';
import { PaginationDto } from '../dtos/paginationDto';

/** Pagination mapper. */
export namespace PaginationMapper {

  /**
   * Maps pagination options to dto representation.
   * @param options Pagination options.
   */
  export function mapOptionsToDto(options: PaginationOptions): string {
    const pageNumberDto = `"page": ${options.page}`;
    const pageOptionDto = `"results": ${options.pageSize}`;
    return [pageNumberDto, pageOptionDto].join(', ');
  }

  /**
   * Maps pagination from dto.
   * @param pageDto Dto page.
   * @param mapFunction Map function for items.
   */
  export function mapPaginationFromDto<TDto, TDomain>(
    pageDto: PaginationDto<TDto>,
    mapFunction: (dto: TDto) => TDomain,
  ): Pagination<TDomain> {
    const { data } = pageDto;

    return {
      items: data.items.map(mapFunction),
      hasMore: data.more,
      size: data.num,
    };
  }
}
