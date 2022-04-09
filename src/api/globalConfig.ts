/** File with default configurations for queries in whole application. */

/** 10 minutes. */
export const defaultStaleTime = 10000 * 60;

/** Default fetch strategy for queries.  */
export const defaultFetchStrategy = {
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};
