import { useCharactersQuery } from './characters';
import { useTagsQuery } from './tags';
import { useVisualNovelQuery } from './visualNovel';
import { useReleasesQuery } from './releases';

/** 10 minutes. */
const defaultStaleTime = 10000 * 60;

/** Default fetch strategy for queries.  */
const defaultFetchStrategy = {
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export { defaultStaleTime, defaultFetchStrategy, useReleasesQuery, useVisualNovelQuery, useTagsQuery, useCharactersQuery };
