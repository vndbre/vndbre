import { Quote } from '../../models/quote';
import { QuoteDto } from '../dtos/quoteDto';

/**
 * Maps dto into model.
 * @param dto Dto.
 */
export const quoteFromDto = (dto: QuoteDto): Quote => ({
  id: dto.id,
  title: dto.title,
  quote: dto.quote,
});
