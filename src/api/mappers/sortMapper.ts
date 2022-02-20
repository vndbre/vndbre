import { SortOptions, SortType } from '../../models/sortOptions';

/** Mapper for sort options. */
export namespace SortMapper {

  /**
   * Maps type of sort to dto representation.
   * @param type Sort type.
   */
  export function mapSortTypeToDto(type: SortType): string {
    return type === SortType.Ascending ? '' : '"reverse": true';
  }

  /**
   * Maps sort options to dto representation.
   * @param data Sort options.
   * @param fieldMap Object for mapping sort fields to the ones that are acceptable for the API.
   */
  export function toDto<T extends number | string>(
    data: SortOptions<T>,
    fieldMap: Record<T, string>,
  ): string {
    const sortOptionDto = `"sort": "${fieldMap[data.field]}"`;
    const sortTypeOptionDto = mapSortTypeToDto(data.type);
    return `${sortOptionDto}${sortTypeOptionDto.length !== 0 ? `, ${sortTypeOptionDto}` : ''}`;
  }
}
