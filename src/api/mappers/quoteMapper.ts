import { Quote } from '../../models/quote';
import { QuoteDto } from '../dtos/quoteDto';

/**
 * Maps dto into model.
 * @param dto Dto.
 */
export function quoteFromDto(dto: QuoteDto): Quote {
  return {
    id: dto.id,
    title: dto.title,
    quote: dto.quote,
  };
}
