import { OptionBase } from 'chakra-react-select';

/** Option for Chakra UI Select component. */
export interface SelectOption extends OptionBase {

  /** Value. */
  readonly value: string;

  /** Readable representation of option value. */
  readonly label: string;

  /** Icon name. */
  readonly icon?: string;
}
