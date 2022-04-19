import React, {
  memo,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  VFC,
} from 'react';
import { Box, HStack } from '@chakra-ui/react';
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

  /** Whether the content should be hidden by default or not. */
  readonly shouldBeHidden?: boolean;
}

/**
 * Component that hides sections of content with long height.
 */
const HideContentComponent: VFC<Props> = ({
  maxHeight,
  transitionDuration = 300,
  showLabel = 'Show more',
  hideLabel = 'Hide',
  shouldBeHidden = true,
  children,
}) => {
  const [isHidden, setIsHidden] = useState(shouldBeHidden);
  const [shouldButtonsBeRendered, setShouldButtonsBeRendered] = useState(true);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    assertNonNull(contentContainerRef.current);

    if (contentContainerRef.current.clientHeight < maxHeight) {
      setShouldButtonsBeRendered(false);
    }
  }, []);

  const contentContainerMaxHeight = useMemo(
    () => {
      assertNonNull(contentContainerRef.current);

      return isHidden ? `${maxHeight}px` : `${contentContainerRef.current.clientHeight}px`;
    },
    [isHidden, maxHeight],
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
