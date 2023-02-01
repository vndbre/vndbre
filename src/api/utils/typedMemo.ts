import type { ComponentType } from 'react';
import { memo } from 'react';

/**
 * Typed memo.
 * @param component Component.
 */
export const typedMemo: <T extends ComponentType>(component: T) => T = memo;
