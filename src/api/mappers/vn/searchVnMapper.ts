import type { SearchVnDto } from 'src/api/dtos/vnDto/searchVnDto';
import type { SearchVn } from 'src/api/models/vn/searchVn';
import { ImageMapper } from '../imageMapper';

export namespace SearchVnMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: SearchVnDto): SearchVn {
    return {
      id: dto.id,
      image: dto.image !== null ? ImageMapper.fromDto(dto.image) : null,
      title: dto.title,
    };
  }
}
