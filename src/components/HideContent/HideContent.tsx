import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  VFC,
} from 'react';
import { Box, HStack, useMediaQuery } from '@chakra-ui/react';
import { TextButton } from '../TextButton/TextButton';
import { assertNonNull } from '../../utils/assertNonNull';

interface Props {

  /**
   * Max height of visible content in pixels.
   * When it is exceeded, the show content button appears.
   */
  readonly maxHeight: number;

  /** Children prop. */
  readonly children: ReactNode;

  /** Duration of show/hide transition in milliseconds. */
  readonly transitionDuration?: number;

  /** Text on the show content button. */
  readonly showLabel?: string;

  /** Text on the hide content button. */
  readonly hideLabel?: string;
}

/**
 * Component that hides sections of content with long height.
 */
const HideContentComponent: VFC<Props> = ({
  maxHeight,
  transitionDuration = 300,
  showLabel = 'Show more',
  hideLabel = 'Hide',
  children,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [shouldButtonsBeRendered, setShouldButtonsBeRendered] = useState(true);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLargerThan768px, isLargerThan1024px, isLargerThan1368px] = useMediaQuery([
    '(min-width: 768px)',
    '(min-width: 1024px)',
    '(min-width: 1368px)',
  ]);

  useEffect(() => {
    assertNonNull(contentContainerRef.current);
    setShouldButtonsBeRendered(contentContainerRef.current.clientHeight >= maxHeight);
  }, [maxHeight, children, isLargerThan768px, isLargerThan1024px, isLargerThan1368px]);

  const contentContainerMaxHeight = useMemo(
    () => {
      if (contentContainerRef.current == null) {
        return `${maxHeight}px`;
      }

      return `${isHidden ? maxHeight : contentContainerRef.current.clientHeight}px`;
    },
    [isHidden, maxHeight, contentContainerRef.current],
  );

  const handleShowContentButtonClick = useCallback(() => setIsHidden(false), []);
  const handleHideContentButtonClick = useCallback(() => setIsHidden(true), []);

  return (
    <Box paddingBottom={1}>
      <Box
        maxHeight={contentContainerMaxHeight}
        overflow="hidden"
        transitionProperty="max-height"
        transitionTimingFunction="ease"
        transitionDuration={`${transitionDuration}ms`}
      >
        <Box ref={contentContainerRef}>
          {children}
        </Box>
      </Box>
      {shouldButtonsBeRendered && (
        <HStack justifyContent="center">
          {isHidden && <TextButton onClick={handleShowContentButtonClick}>{showLabel}</TextButton>}
          {isHidden === false && <TextButton onClick={handleHideContentButtonClick}>{hideLabel}</TextButton>}
        </HStack>
      )}
    </Box>
  );
};

export const HideContent = memo(HideContentComponent);
