import { ImageFlagging } from '../../models/imageFlagging';
import { ImageFlaggingDto } from '../dtos/imageFlaggingDto';

/**
 * Maps dto to image flagging model.
 * @param dto Dto object.
 */
export const imageFlaggingFromDto = (dto: ImageFlaggingDto): ImageFlagging => ({
  voteCount: dto.votecount,
  sexualAvg: dto.sexual_avg,
  violenceAvg: dto.violence_avg,
});

/**
 * Maps model to dto.
 * @param data Image flagging object.
 */
export const imageFlaggingToDto = (data: ImageFlagging): ImageFlaggingDto => ({
  votecount: data.voteCount,
  sexual_avg: data.sexualAvg,
  violence_avg: data.violenceAvg,
});
