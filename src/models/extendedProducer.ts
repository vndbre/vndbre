import { Producer, ProducerRelated } from './producer';

/**
 * Describes shape of extended producer.
 */
export interface ExtendedProducer extends Producer, Pick<ProducerRelated, 'relation'> {}
