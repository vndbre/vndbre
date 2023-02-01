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

/** Select group. */
export interface Group<TOption extends Option = Option> {

  /** Options. */
  readonly options: readonly TOption[];

  /** Label. */
  readonly label?: string;
}

export declare type OptionsOrGroups<
  TOption extends Option = Option,
  TGroup extends Group<TOption> = Group<TOption>,
> = readonly (TOption | TGroup)[];
