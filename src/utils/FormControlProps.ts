import type { Control, RegisterOptions, FieldValues, FieldPath } from 'react-hook-form';

/** Props that are required for any form control component. */
export interface FormControlProps<T extends FieldValues = FieldValues> {

  /**
   * The object from the invoking `useForm` hook of React Hook Forms.
   * Provides API for registering component into needed form.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly control: Control<T, any>;

  /** Name of the control. */
  readonly name: FieldPath<T>;

  /** Validation rules. */
  readonly rules?: RegisterOptions;
}
