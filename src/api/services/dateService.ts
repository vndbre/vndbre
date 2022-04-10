/**
 * Date service.
 */
export namespace DateService {

  /**
   * Formats date to 'yyyy-mm-dd' string.
   * @param date Date.
   */
  export const toISODate = (date: Date): string => {
    const yyyy = date
      .getFullYear()
      .toString()
      .padStart(4, '0');
    const mm = (date.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const dd = date
      .getDate()
      .toString()
      .padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  /**
   * Sort dates by ascending order.
   * @example
   * ```ts
   *  const dates = [new Date(), new Date('2000-12-12'), null, new Date('2001-12-12'), null];
   *  dates.sort(sortDates); // ["2000-12-12T00:00:00.000Z", "2001-12-12T00:00:00.000Z", "2022-04-10T16:38:12.731Z", null, null]
   * ```
   * @param date1 Date.
   * @param date2 Date.
   */
  export const sortDatesAscending = (date1: Date | null, date2: Date | null): number => {
    if (date1 !== null && date2 !== null) {
      return date1 > date2 ? 1 : -1;
    }
    if (date1 === null && date2 !== null) {
      return 1;
    }
    if (date1 !== null && date2 === null) {
      return -1;
    }
    return 0;
  };
}
