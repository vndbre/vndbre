import React, { VFC } from 'react';
import { ContentWrapper } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { ProducerRouteParams } from '../../utils/producerRouteParams';
import { useReleasesQuery } from '../../queries';
import { Releases } from '../../../../components/Releases/Releases';

/**
 * Releases page.
 */
export const ReleasesPage: VFC = () => {
  const { id } = useRouteParams<ProducerRouteParams>();
  const {
    isLoading: isReleasesLoading,
    data: releasesData,
    error: releasesError,
  } = useReleasesQuery(Number(id));

  return (
    <ContentWrapper isLoading={isReleasesLoading} error={releasesError}>
      {releasesData != null && <Releases releasesData={releasesData} />}
    </ContentWrapper>
  );
};
