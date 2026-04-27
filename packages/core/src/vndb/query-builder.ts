import type { VndbFilterCondition, VndbFilterExpression, VndbOperator } from "./types";

export type FilterCombinationMode = "and" | "or";

export function filter<Field extends string, Operator extends VndbOperator, Value>(
  field: Field,
  operator: Operator,
  value: Value,
): VndbFilterCondition<Field, Value> {
  return [field, operator, value];
}

export function and<Condition extends VndbFilterCondition>(
  ...expressions: VndbFilterExpression<Condition>[]
) {
  return group("and", expressions);
}

export function or<Condition extends VndbFilterCondition>(
  ...expressions: VndbFilterExpression<Condition>[]
) {
  return group("or", expressions);
}

export function combine<Condition extends VndbFilterCondition>(
  mode: FilterCombinationMode,
  expressions: VndbFilterExpression<Condition>[],
) {
  return group(mode, expressions);
}

function group<Condition extends VndbFilterCondition>(
  mode: FilterCombinationMode,
  expressions: VndbFilterExpression<Condition>[],
) {
  if (expressions.length === 0) {
    return undefined;
  }

  if (expressions.length === 1) {
    return expressions[0];
  }

  return [mode, ...expressions] as const;
}
