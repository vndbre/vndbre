/** Represents available operators to build a search query. */
export const OPERATORS = ['=', '>', '<', '>=', '<=', '!='] as const;

/** Represents available operators to build a search query. */
export type Operator = typeof OPERATORS[number];
