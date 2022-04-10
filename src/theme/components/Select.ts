import { OptionBase } from 'chakra-react-select';

/** Option for Chakra UI Select component. */
export interface SelectOption<T = string> extends OptionBase {

  /** Value. */
  readonly value: T;

  /** Readable representation of option value. */
  readonly label: string;

  /** Icon name. */
  readonly icon?: string;
}
