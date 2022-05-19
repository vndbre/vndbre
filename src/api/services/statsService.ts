import { http } from '..';
import { Stats } from '../../models/stats';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';
import { StatsDto } from '../dtos/statsDto';
import { StatsMapper } from '../mappers/statsMapper';

export namespace StatsService {

  /** Fetches statistics about total amount of different entities. */
  export async function fetchStats(): Promise<Stats> {
    const { data } = await http.post<StatsDto>(
      ApiProxyEndpoints.VNDB,
      'dbstats',
    );

    return StatsMapper.fromDto(data);
  }
}
