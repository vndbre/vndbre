import type { PropsWithChildren } from 'react';

export type PropsWithClass<T> = T & {
  readonly className?: string;
}

export type PropsWithChildrenAndClass<T> = PropsWithChildren<PropsWithClass<T>>