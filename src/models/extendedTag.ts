import { Tag } from './tag';
import { VisualNovelTag } from './visualNovel';

/**
 * Represents vn tag with all possible properties.
 */
export interface ExtendedTag extends Tag, Readonly<Omit<VisualNovelTag, 'id'>> {}
