import { memo } from 'react';

/** Typed memo to provide generic types. */
export const typedMemo: <T>(component: T) => T = memo;
