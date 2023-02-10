import type { ImageDto } from '../dtos/imageDto';
import type { Image } from '../models/image';

export namespace ImageMapper {
  export function fromDto(dto: ImageDto): Image {
    return {
      id: dto.id,
      dimensions: dto.dims,
      sexual: dto.sexual,
      url: dto.url,
      violence: dto.violence,
      voteCount: dto.violence,
    };
  }
}
