import type { Control, RegisterOptions } from 'react-hook-form';

/** Props that are required for any form control component. */
export interface FormControlProps {

  /**
   * The object from the invoking `useForm` hook of React Hook Forms.
   * Provides API for registering component into needed form.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly control: Control<any>;

  /** Name of the control. */
  readonly name: string;

  /** Validation rules. */
  readonly rules?: RegisterOptions;
}
