import { useEffect, useState } from 'react';

/**
 * Hook to check if floating header visible.
 */
export function useFloatingHeader(): boolean {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  /**
   * Scroll event listener.
   * @param event Event.
   */
  function scrollListener(event: Event): void {
    const newScrollPosition = (event.target as Document).scrollingElement?.scrollTop;

    if (newScrollPosition == null) {
      return;
    }

    if (scrollPosition > newScrollPosition) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
    setScrollPosition(newScrollPosition);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  });

  return isScrollingUp;
}
