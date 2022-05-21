import { OptionBase } from 'chakra-react-select';

/** Option for Chakra UI Select component. */
export interface SelectOption<T = string | number> extends OptionBase {

  /** Value. */
  readonly value: T;

  /** Readable representation of option value. */
  readonly label: string;

  /** Icon name. */
  readonly icon?: string;
}

export namespace SelectOption {

  /**
   * Creates select option.
   * @param value Value.
   * @param label Label.
   * @param icon Icon.
   */
  export function create<T>(value: SelectOption<T>['value'], label: SelectOption['label'], icon?: SelectOption['label']): SelectOption<T> {
    return {
      value,
      label,
      ...(icon == null ? null : { icon }),
    };
  }
}
