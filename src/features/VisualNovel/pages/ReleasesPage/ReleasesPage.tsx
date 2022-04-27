import React, { VFC } from 'react';
import { useReleasesQuery } from '../../queries';
import { ContentWrapper, Releases } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/**
 * Releases page.
 */
export const ReleasesPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();

  const {
    isLoading: isReleasesLoading,
    data: releasesData,
    error: releasesError,
  } = useReleasesQuery(Number(id));

  return (
    <ContentWrapper isLoading={isReleasesLoading} error={releasesError}>
      {releasesData && <Releases data={releasesData} />}
    </ContentWrapper>
  );
};
