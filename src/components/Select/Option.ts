import type { ReactNode } from 'react';

/** Select option. */
export interface Option {

  /** Unique value. */
  readonly value: string;

  /** Label. */
  readonly label: string;

  /** Icon. */
  readonly icon?: ReactNode;
}
