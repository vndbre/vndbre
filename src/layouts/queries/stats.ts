import { useQuery, UseQueryResult } from 'react-query';
import { StatsService } from '../../api/services/statsService';
import { Stats } from '../../models/stats';

/** Custom hook for making fetch stats query. */
export const useStatsQuery = (): UseQueryResult<Stats, Error> => useQuery(['stats'], () => StatsService.fetchStats());
