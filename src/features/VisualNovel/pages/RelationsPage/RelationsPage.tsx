import React, { VFC } from 'react';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { useVisualNovelQuery } from '../../queries';
import { useRelatedVisualNovelsQuery } from '../../queries/visualNovel';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/** Relations page component. */
export const RelationsPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { data: visualNovel, isLoading: isVisualNovelLoading, error: visualNovelError } = useVisualNovelQuery(id);
  const relatedNovelsIds: number[] = visualNovel?.relations?.map(relation => relation.id) ?? [];
  const { data: relatedNovels, isLoading: isRelatedNovelsLoading, error: relatedNovelsError } = useRelatedVisualNovelsQuery(
    id,
    relatedNovelsIds,
    {
      enabled: relatedNovelsIds.length > 0,
    },
  );

  console.log(relatedNovels);
  return <div>test</div>;
};
