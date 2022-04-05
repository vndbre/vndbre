import React, { VFC, memo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Icon } from '../Icon/Icon';

interface Props {

  /** Whether button is disabled. */
  readonly isDisabled?: boolean;

  /** Click handler. */
  readonly onClick?: () => void;

  /** Direction. */
  readonly direction: 'next' | 'prev';
}

/**
 * Paginator edge button.
 */
const PaginatorNavigationButtonComponent: VFC<Props> = ({ isDisabled = false, onClick, direction }) => (
  <IconButton
    disabled={isDisabled}
    onClick={onClick}
    colorScheme="gray"
    aria-label={direction === 'prev' ? 'Previous' : 'Next'}
    icon={direction === 'prev' ?
      <Icon name="carbon:chevron-left" /> :
      <Icon name="carbon:chevron-right" />}
  />
);

export const PaginatorNavigationButton = memo(PaginatorNavigationButtonComponent);
