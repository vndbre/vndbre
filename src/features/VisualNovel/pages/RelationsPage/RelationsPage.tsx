import React, { VFC } from 'react';
import { ContentWrapper, Error } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { RelationCard } from '../../components';
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

  if (visualNovelError) {
    return <Error error={visualNovelError} />;
  }


  return (
    <ContentWrapper isLoading={isVisualNovelLoading || isRelatedNovelsLoading} error={relatedNovelsError}>
      {relatedNovels && relatedNovels.length > 0 ? (
        
      ): null}
    </ContentWrapper>
  );
};
