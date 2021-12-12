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
}
