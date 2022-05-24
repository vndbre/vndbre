import React, { VFC } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { ContentWrapper, EntityDetail, EntityLinks, EntityTitle, Releases } from '../../../../components';
import { useRouteParams } from '../../../../hooks';
import { useProducerQuery, useRelatedProducersQuery, useReleasesQuery } from '../../queries';
import { Language } from '../../../../models/language';
import { ProducerType } from '../../../../models/producerType';
import { ProducerRelations } from '../../components';
import { ProducerRouteParams } from '../../utils/producerRouteParams';
import { Description } from '../../../../components/Description/Description';

/** Producer page component. */
export const ProducerPage: VFC = () => {
  const { id } = useRouteParams<ProducerRouteParams>();

  const { data: producer, isLoading: isProducerLoading, error: producerError } = useProducerQuery(Number(id));

  const relatedProducersIds = producer?.relations.map(relation => relation.id) ?? [];

  const {
    data: relatedProducers,
    isLoading: isRelatedProducersLoading,
    error: relatedProducersError,
  } = useRelatedProducersQuery(Number(id), relatedProducersIds, {
    enabled: relatedProducersIds.length > 0,
  });

  const {
    isLoading: isReleasesLoading,
    data: releasesData,
    error: releasesError,
  } = useReleasesQuery(Number(id));

  return (
    <ContentWrapper isLoading={isProducerLoading} error={producerError}>
      {producer != null && (
        <Box>
          <VStack
            align="initial"
            spacing={{
              base: 4,
              md: 8,
            }}
          >
            <EntityTitle title={producer.name} originalTitle={producer.originalName ?? producer.aliases} />
            <VStack align="initial" spacing="2">
              <EntityDetail title="Primary language">{Language.toReadable(producer.language)}</EntityDetail>
              <EntityDetail title="Producer type">{ProducerType.toReadable(producer.type)}</EntityDetail>
              {producer.links != null && producer.links.length > 0 && (
                <EntityDetail title="Links">
                  <EntityLinks links={producer.links} />
                </EntityDetail>
              )}
              <ContentWrapper isLoading={isRelatedProducersLoading} error={relatedProducersError}>
                {relatedProducers != null && <ProducerRelations producer={producer} relatedProducers={relatedProducers} />}
              </ContentWrapper>
            </VStack>
            <Description text={producer.description} />
          </VStack>
        </Box>
      )}
      <Box mt="10">
        <ContentWrapper isLoading={isReleasesLoading} error={releasesError}>
          {releasesData != null && <Releases data={releasesData} />}
        </ContentWrapper>
      </Box>
    </ContentWrapper>
  );
};
