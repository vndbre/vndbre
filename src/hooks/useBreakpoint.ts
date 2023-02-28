import { useMediaQuery } from 'usehooks-ts';

const breakpoints = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

/**
 * Hook to check if the breakpoint is reached.
 * @param breakpoint Breakpoint size.
 */
export const useBreakpoint = (breakpoint: keyof typeof breakpoints): boolean =>
  useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);
