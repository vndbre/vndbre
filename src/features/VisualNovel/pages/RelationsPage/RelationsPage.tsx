import React, { VFC } from 'react';
import { Grid } from '@chakra-ui/react';
import { ContentWrapper, Error } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { RelationCard } from '../../components';
import { useVisualNovelQuery } from '../../queries';
import { useRelatedVisualNovelsQuery } from '../../queries/visualNovel';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/** Relations page component. */
export const RelationsPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { data: visualNovel, isLoading: isVisualNovelLoading, error: visualNovelError } = useVisualNovelQuery(Number(id));
  const relatedNovelsIds: number[] = visualNovel?.relations?.map(relation => relation.id) ?? [];
  const { data: relatedNovels, isLoading: isRelatedNovelsLoading, error: relatedNovelsError } = useRelatedVisualNovelsQuery(
    Number(id),
    relatedNovelsIds,
    {
      enabled: relatedNovelsIds.length > 0,
    },
  );

  if (visualNovelError) {
    return <Error error={visualNovelError} />;
  }

  /**
   * Displays related novel cards.
   * @param novels Array of related visual novels.
   * @param novel Parent visual novel.
   */
  const displayRelationCards = (novels: VisualNovel[], novel: VisualNovel): JSX.Element[] =>
    novels.map(relatedNovel => {
      const { isOfficial, relationType } = VisualNovel.getRelationData(novel, relatedNovel.id);
      return (
        <RelationCard
          key={relatedNovel.id}
          id={relatedNovel.id}
          relationType={relationType}
          title={relatedNovel.title}
          isOfficial={isOfficial}
          image={relatedNovel.image}
          isImageNsfw={relatedNovel.isImageNsfw}
        />
      );
    });

  return (
    <ContentWrapper isLoading={isVisualNovelLoading || isRelatedNovelsLoading} error={relatedNovelsError}>
      {visualNovel && relatedNovels && relatedNovels.length > 0 ? (
        <Grid pt="4" templateColumns="repeat(auto-fit, minmax(var(--chakra-sizes-96), 1fr))" gridGap="4">
          {displayRelationCards(relatedNovels, visualNovel)}
        </Grid>
      ) : null}
    </ContentWrapper>
  );
};
