import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

interface Size {

  /** Width. */
  readonly width: number;

  /** Height. */
  readonly height: number;
}

/**
 * Hook to get element size.
 * @param elementRef Element ref.
 */
export const useElementSize = (elementRef: RefObject<HTMLElement>): Size => {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const handleSize = (): void => {
    setSize({
      width: elementRef.current?.offsetWidth ?? 0,
      height: elementRef.current?.offsetHeight ?? 0,
    });
  };

  useEffect(() => {
    if (elementRef.current != null) {
      new ResizeObserver(handleSize).observe(elementRef.current);
    }
  }, []);

  return size;
};
