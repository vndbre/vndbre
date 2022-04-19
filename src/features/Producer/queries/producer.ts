import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { ProducersService } from '../../../api/services/producersService';
import { Producer } from '../../../models/producer';

/**
 * Gets producer by its id.
 * @param id Producer id.
 * @param options Query options.
 */
export const useProducerQuery = (
  id: Producer['id'],
  options?: QueryObserverOptions<Producer, Error>,
): UseQueryResult<Producer, Error> =>
  useQuery(
    ['producer', id],
    () => ProducersService.fetchProducerById(id),
    { ...options },
  );

/**
 * Gets producers by ids.
 * @param key Query key.
 * @param ids List of producer ids.
 * @param options Query options.
 */
export const useRelatedProducersQuery = (
  key: Producer['id'],
  ids: Producer['id'][],
  options?: QueryObserverOptions<Producer[], Error>,
): UseQueryResult<Producer[], Error> =>
  useQuery(
    ['producers', key],
    () => ProducersService.fetchProducerByIds(ids),
    { ...options },
  );
