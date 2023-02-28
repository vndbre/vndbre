import type { CSSProperties } from 'react';

/** Generic to provide `style` to props. */
export type PropsWithStyle<T = unknown> = T & {
  style?: CSSProperties | undefined;
};
