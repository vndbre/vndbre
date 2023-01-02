import type { Operator } from '../operator';

/** Describes shape of query filter. */
export type BaseFilter<Field extends string, O extends Operator = Operator> = [Field, O, string];
