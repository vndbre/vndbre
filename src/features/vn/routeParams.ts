import type { RouteParams } from '@/types/routeParams';

interface Params {

  /** Vn id. */
  readonly id: string;
}

export type VnRouteParams = RouteParams<Params>;
