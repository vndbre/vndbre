import { useEffect, useState } from 'react';

const MIN_FORCED_VISIBLE_POSITION = 56;

/** Hook to check if floating header visible. */
export function useFloatingHeader(): boolean {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  /**
   * Scroll event listener.
   * @param event Event.
   */
  function handleScroll(event: Event): void {
    const newScrollPosition = (event.target as Document).scrollingElement?.scrollTop;

    if (newScrollPosition == null) {
      return;
    }

    if (newScrollPosition < scrollPosition || newScrollPosition < MIN_FORCED_VISIBLE_POSITION) {
      setIsHeaderVisible(true);
    } else {
      setIsHeaderVisible(false);
    }
    setScrollPosition(newScrollPosition);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return isHeaderVisible;
}
