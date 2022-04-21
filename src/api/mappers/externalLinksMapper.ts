/* eslint-disable jsdoc/require-jsdoc */
import { ExternalLink } from '../../models/externalLink';
import { assertNonNull } from '../../utils/assertNonNull';
import { ExternalLinksDto } from '../dtos/externalLinksDto';

const HREF_FACTORY: Readonly<Record<keyof ExternalLinksDto, (value: string) => string>> = {
  anidb: value => `https://anidb.net/creator/${value}`,
  encubed: value => `http://novelnews.net/tag/${value}/`,
  homepage: value => value,
  pixiv: value => `https://www.pixiv.net/en/users/${value}`,
  renai: value => `https://renai.us/game/${value}`,
  twitter: value => `https://twitter.com/${value}`,
  wikidata: value => `https://www.wikidata.org/wiki/${value}`,
  wikipedia: value => `https://en.wikipedia.org/wiki/${value}`,
};

/**
 * Maps external link from dto.
 * @param key The name of the external link.
 * @param value The value of the external link.
 */
const mapExternalLinkFromDto = (key: keyof ExternalLinksDto, value: string): ExternalLink => {
  const createHref = HREF_FACTORY[key];
  assertNonNull(createHref);
  return ({ label: key, href: createHref(value) });
};

/** External links mapper. */
export namespace ExternalLinksMapper {

  /**
   * Maps external links from dto.
   * @param dto Dto.
   */
  export function fromDto(dto: ExternalLinksDto): ExternalLink[] {
    return Object.entries(dto)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => mapExternalLinkFromDto(key as keyof ExternalLinksDto, value));
  }
}
