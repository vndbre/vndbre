import type { ComponentProps, ElementType } from 'react';

interface AsProps<C extends ElementType> {

  /** Component. */
  readonly as?: C;
}

/**
 * @example
 * ```
 * const PolymorphicComponent = <C extends ElementType>({
 *   as,
 *   ...props
 * }: PolymorphicProps<C>): JSX.Element => {
 *   const Component = as ?? 'div';
 *   return (
 *     <Component {...props} />
 *   );
 * };
 * ```
 */
export type PolymorphicProps<C extends ElementType> =
& AsProps<C>
& Omit<ComponentProps<C>, keyof AsProps<C>>;
