import { useCharactersQuery } from './characters';
import { useTagsQuery } from './tags';
import { useVisualNovelQuery } from './visualNovel';
import { useReleasesQuery } from './releases';

/** 10 minutes. */
const defaultStaleTime = 10000 * 60;

export { defaultStaleTime, useReleasesQuery, useVisualNovelQuery, useTagsQuery, useCharactersQuery };
