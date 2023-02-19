import type { VnDto } from 'src/api/dtos/vnDto/vnDto';
import type { LanguageCode } from 'src/api/models/language';
import type { Platform } from 'src/api/models/platform';
import type { Vn } from 'src/api/models/vn/vn';
import { ImageMapper } from '../imageMapper';
import { TagMapper } from '../tag/tagMapper';
import { VnDevelopmentStatusMapper } from './developmentStatusMapper';
import { VnLengthMapper } from './lengthMapper';
import { VnScreenshotMapper } from './screenshotMapper';
import { VnTitleMapper } from './titleMapper';

export namespace VnMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: VnDto): Vn {
    return {
      id: dto.id,
      aliases: dto.aliases,
      altTitle: dto.alttitle,
      description: dto.description,
      developmentStatus: VnDevelopmentStatusMapper.fromDto(dto.devstatus),
      image: dto.image && ImageMapper.fromDto(dto.image),
      languages: dto.languages as LanguageCode[],
      platforms: dto.platforms as Platform[],
      length: dto.length && VnLengthMapper.fromDto(dto.length),
      lengthMinutes: dto.length_minutes,
      lengthVotes: dto.length_votes,
      originalLanguage: dto.olang as LanguageCode,
      popularity: dto.popularity,
      rating: dto.rating,
      released: dto.released,
      screenshots: dto.screenshots.map(VnScreenshotMapper.fromDto),
      tags: dto.tags.map(TagMapper.fromDto),
      title: dto.title,
      titles: dto.titles.map(VnTitleMapper.fromDto),
      voteCount: dto.votecount,
    };
  }
}
