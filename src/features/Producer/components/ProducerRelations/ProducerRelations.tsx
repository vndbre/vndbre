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

/** Producer relations component. */
const ProducerRelationsComponent: VFC<Props> = ({ producer, relatedProducers }) => {
  /** Gets grouped extended producers by relation type. */
  const getGroupedExtendedProducers = (): Record<ProducerRelationType, ExtendedProducer[]> => {
    const initialValue: Record<ProducerRelationType, ExtendedProducer[]> = {
      [ProducerRelationType.Subsidiary]: [],
      [ProducerRelationType.Parent]: [],
      [ProducerRelationType.Unknown]: [],
    };

    if (producer != null && relatedProducers != null) {
      return producer.relations.reduce<Record<ProducerRelationType, ExtendedProducer[]>>((acc, cur) => {
        const relatedProducer = relatedProducers.find(prod => cur.id === prod.id);
        if (relatedProducer == null) {
          return acc;
        }

        return { ...acc, [cur.relation]: [...acc[cur.relation], { ...relatedProducer, relation: cur.relation }] };
      }, initialValue);
    }

    return initialValue;
  };

  return (
    <>
      {Object.entries(getGroupedExtendedProducers()).map(([key, value]) => value.length > 0 && (
        <EntityDetail key={key} title={ProducerRelationType.toReadable(ProducerRelationType.toProducerRelationType(key))}>
          <HStack display="inline">
            {value.map(prod => (
              <Link key={prod.id} as={NavLink} to={`/producer/${prod.id}`}>
                {prod.name}
              </Link>
            ))}
          </HStack>
        </EntityDetail>
      ))}
    </>
  );
};

export const ProducerRelations = memo(ProducerRelationsComponent);
