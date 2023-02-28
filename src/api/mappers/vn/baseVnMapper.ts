import type { BaseVnDto } from 'src/api/dtos/vnDto/baseVnDto';
import type { BaseVn } from 'src/api/models/vn/baseVn';
import { ImageMapper } from '../imageMapper';

export namespace BaseVnMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: BaseVnDto): BaseVn {
    return {
      id: dto.id,
      image: dto.image !== null ? ImageMapper.fromDto(dto.image) : null,
      title: dto.title,
    };
  }
}
