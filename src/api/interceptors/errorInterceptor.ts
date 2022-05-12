import { AppError } from '../../models/appError';

interface ApiError {

  /** Response. */
  readonly response: {

    /** Status code. */
    readonly status: number;

    /** Data. */
    readonly data: {

      /** Data. */
      readonly data: {

        /** Error message. */
        readonly msg: string;
      };
    };
  };
}

/**
 * Type guard for API errors.
 * @param error Error.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isApiError(error: any): error is ApiError {
  return typeof error === 'object' && error?.response?.data?.data?.msg && error?.response?.status;
}

/**
 * Interceptor that handles API errors.
 * @param error Error.
 */
export function errorInterceptor(error: unknown): void {
  if (isApiError(error)) {
    throw new AppError(error.response.data.data.msg, error.response.status);
  }

  throw new AppError((error as Error).message);
}
