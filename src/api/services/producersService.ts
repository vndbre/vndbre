import { http } from '..';
import { Producer } from '../../models/producer';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';
import { PaginationDto } from '../dtos/paginationDto';
import { ProducerDto } from '../dtos/producerDto';
import { PaginationMapper } from '../mappers/paginationMapper';
import { ProducerMapper } from '../mappers/producerMapper';

export namespace ProducersService {

  /**
   * Fetches producer by its id.
   * @param id Producer id.
   */
  export async function fetchProducerById(id: Producer['id']): Promise<Producer> {
    const { data } = await http.post<PaginationDto<ProducerDto>>(
      ApiProxyEndpoints.VNDB,
      `get producer basic,details,relations (id = ${id})`,
    );

    return PaginationMapper.mapPaginationFromDto(data, ProducerMapper.fromDto).items[0];
  }

  /**
   * Get producers by ids.
   * @param ids Producer ids.
   */
  export async function fetchProducerByIds(ids: Producer['id'][]): Promise<Producer[]> {
    const { data } = await http.post<PaginationDto<ProducerDto>>(
      ApiProxyEndpoints.VNDB,
      `get producer basic,details,relations (id = [${ids}]) {"results": 25}`,
    );

    return PaginationMapper.mapPaginationFromDto(data, ProducerMapper.fromDto).items as Producer[];
  }
}
