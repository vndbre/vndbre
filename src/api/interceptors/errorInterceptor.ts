import { AppError } from '../../models/appError';

interface ApiError {
  readonly response: {
    readonly status: number;
    readonly data: {
      readonly data: {
        readonly msg: string;
      };
    };
  };
}

/**
 *
 * @param error
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isApiError(error: any): error is ApiError {
  return typeof error === 'object' && error?.response?.data?.data?.msg && error?.response?.status;
}

/**
 *
 * @param error
 */
export function errorInterceptor(error: unknown): void {
  if (isApiError(error)) {
    throw new AppError(error.response.data.data.msg, error.response.status);
  }

  throw new AppError((error as Error).message);
}
