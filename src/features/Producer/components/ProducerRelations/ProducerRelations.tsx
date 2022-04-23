import React, { memo, VFC } from 'react';
import { HStack, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { EntityDetail } from '../../../../components';
import { ExtendedProducer } from '../../../../models/extendedProducer';
import { Producer } from '../../../../models/producer';
import { ProducerRelationType } from '../../../../models/producerRelationType';

interface Props {

  /** Producer. */
  readonly producer: Producer;

  /** Related producers. */
  readonly relatedProducers: readonly Producer[];
}

/**
 * Gets grouped extended producers by relation type.
 * @param producer Producer.
 * @param relatedProducers Producers related to current producer.
 */
const getGroupedExtendedProducers = (
  producer: Producer,
  relatedProducers: readonly Producer[],
): Record<ProducerRelationType, ExtendedProducer[]> => {
  const initialValue: Record<ProducerRelationType, ExtendedProducer[]> = {
    [ProducerRelationType.Subsidiary]: [],
    [ProducerRelationType.Parent]: [],
    [ProducerRelationType.Unknown]: [],
  };

  return producer.relations.reduce<Record<ProducerRelationType, ExtendedProducer[]>>((acc, cur) => {
    const relatedProducer = relatedProducers.find(prod => cur.id === prod.id);
    if (relatedProducer == null) {
      return acc;
    }

    return { ...acc, [cur.relation]: [...acc[cur.relation], { ...relatedProducer, relation: cur.relation }] };
  }, initialValue);
};

/** Producer relations component. */
const ProducerRelationsComponent: VFC<Props> = ({ producer, relatedProducers }) => (
  <>
    {Object.entries(getGroupedExtendedProducers(producer, relatedProducers)).map(([key, value]) => value.length > 0 && (
      <EntityDetail key={key} title={ProducerRelationType.toReadable(ProducerRelationType.toProducerRelationType(key))}>
        <HStack display="inline">
          {value.map(p => (
            <Link key={p.id} as={NavLink} to={`/producer/${p.id}`}>
              {p.name}
            </Link>
          ))}
        </HStack>
      </EntityDetail>
    ))}
  </>
);
export const ProducerRelations = memo(ProducerRelationsComponent);
