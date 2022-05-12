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
function isApiError(error: unknown): error is ApiError {
  if (typeof error !== 'object') {
    return false;
  }

  const response = (error as Partial<ApiError>)?.response;
  return response?.data?.data?.msg != null && response?.status != null;
}

/**
 * Type guard for `Error` objects.
 * @param error Error.
 */
function isError(error: unknown): error is Error {
  return typeof error === 'object' && error != null && 'message' in error;
}

/**
 * Interceptor that handles API errors.
 * @param error Error.
 */
export function errorInterceptor(error: unknown): void {
  if (isApiError(error)) {
    throw new AppError(error.response.data.data.msg, error.response.status);
  }

  throw new AppError(isError(error) ? error.message : 'Unknown Error!');
}
