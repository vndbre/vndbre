import { ImageFlagging } from '../../models/imageFlagging';
import { ImageFlaggingDto } from '../dtos/imageFlaggingDto';

/**
 * Maps dto to image flagging model.
 * @param dto Dto object.
 * @returns ImageFlagging object.
 */
export const imageFlaggingFromDto = (dto: ImageFlaggingDto): ImageFlagging => ({
  votecount: dto.votecount,
  sexualAvg: dto.sexual_avg,
  violenceAvg: dto.violence_avg,
});

/**
 * Maps model to dto.
 * @param data Image flagging object.
 * @returns Dto object.
 */
export const imageFlaggingToDto = (data: ImageFlagging): ImageFlaggingDto => ({
  votecount: data.votecount,
  sexual_avg: data.sexualAvg,
  violence_avg: data.violenceAvg,
});
