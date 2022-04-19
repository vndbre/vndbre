/** Producer relation type between companies. */
export enum ProducerRelationType {
  Parent = 'par',
  Subsidiary = 'sub',
  Unknown = 'unk',
}

export namespace ProducerRelationType {
  const TO_READABLE_MAP: Readonly<Record<ProducerRelationType, string>> = {
    [ProducerRelationType.Parent]: 'Parent company',
    [ProducerRelationType.Subsidiary]: 'Subsidiary',
    [ProducerRelationType.Unknown]: 'Unknown relation',
  };

  /**
   * Converts enum value to a readable equivalent.
   * @param value Relation type.
   */
  export const toReadable = (value: ProducerRelationType): string => TO_READABLE_MAP[value];

  /**
   * Converts string into relation type.
   * @param value Value.
   */
  export const toProducerRelationType = (value: string): ProducerRelationType => {
    const type = value as ProducerRelationType;
    return TO_READABLE_MAP[type] ? type : ProducerRelationType.Unknown;
  };
}
