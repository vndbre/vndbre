/** List of available operators to build a search query. */
export const OPERATORS = ['=', '>', '<', '>=', '<=', '!='] as const;

/** Available operators to build a search query. */
export type Operator = typeof OPERATORS[number];

/** Base filter for query. */
export type BaseFilter<Field extends string, O extends Operator> = [Field, O, string];
