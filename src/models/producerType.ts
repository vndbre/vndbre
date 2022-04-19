/** Producer type. */
export enum ProducerType {
  Company = 'co',
  Individual = 'in',
  Amateur = 'ng',
  Unknown = 'un',
}

export namespace ProducerType {
  const TO_READABLE_MAP: Readonly<Record<ProducerType, string>> = {
    [ProducerType.Company]: 'Company',
    [ProducerType.Individual]: 'Individual',
    [ProducerType.Amateur]: 'Amateur group',
    [ProducerType.Unknown]: 'Unknown type',
  };

  /**
   * Converts enum value to a readable equivalent.
   * @param value Producer type.
   */
  export const toReadable = (value: ProducerType): string => TO_READABLE_MAP[value];

  /**
   * Converts string into relation type.
   * @param value Value.
   */
  export const toProducerType = (value: string): ProducerType => {
    const type = value as ProducerType;
    return TO_READABLE_MAP[type] ? type : ProducerType.Unknown;
  };
}
