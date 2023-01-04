/** List of available operators to build a search query. */
export const OPERATORS = ['=', '>', '<', '>=', '<=', '!='] as const;

/** Available operators to build a search query. */
export type Operator = typeof OPERATORS[number];
