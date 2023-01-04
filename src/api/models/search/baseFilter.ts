import type { Operator } from '../operator';

/** Base filter for query. */
export type BaseFilter<Field extends string, O extends Operator> = [Field, O, string];
