import { useMediaQuery } from '@chakra-ui/react';

const MAX_MOBILE_WIDTH = 1024;

/**
 * Hook to check if the screen size is mobile.
 */
export function useIsMobile(): boolean {
  const [isMobile] = useMediaQuery(`(max-width: ${MAX_MOBILE_WIDTH}px)`);

  return isMobile;
}
