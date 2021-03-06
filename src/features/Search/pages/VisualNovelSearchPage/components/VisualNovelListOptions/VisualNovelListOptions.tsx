import React, { memo, useCallback, VFC } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { Icon } from '../../../../../../components/Icon/Icon';
import { VisualNovelListVariant } from '../VisualNovelList/VisualNovelList';

interface Props {

  /** Active variant.  */
  readonly activeVariant: VisualNovelListVariant;

  /** Variant change handler.  */
  readonly onVariantChange: (variant: VisualNovelListVariant) => void;
}

interface ButtonOption {

  /**
   * Icon name.
   */
  readonly icon: string;

  /**
   * List variant.
   */
  readonly variant: VisualNovelListVariant;

  /**
   * Icon button label.
   */
  readonly label: string;
}

export const buttonOptions: readonly ButtonOption[] = [
  {
    icon: 'carbon:menu',
    variant: 'table',
    label: 'Table',
  },
  {
    icon: 'carbon:grid',
    variant: 'cards',
    label: 'Cards',
  },
  {
    icon: 'carbon:show-data-cards',
    variant: 'wide-cards',
    label: 'Wide cards',
  },
  {
    icon: 'carbon:horizontal-view',
    variant: 'extended-cards',
    label: 'Extended Cards',
  },
];

/** Visual novel list options. */
const VisualNovelListOptionsComponent: VFC<Props> = ({ activeVariant, onVariantChange }) => {
  const handleIconButtonClick = useCallback((variant: VisualNovelListVariant) => () => onVariantChange(variant), [onVariantChange]);

  return (
    <Box>
      {buttonOptions.map(({ icon, variant, label }) => (
        <IconButton
          key={variant}
          onClick={handleIconButtonClick(variant)}
          aria-label={label}
          icon={<Icon name={icon} />}
          borderRadius="none"
          colorScheme="gray"
          _focusWithin={{
            zIndex: 1,
          }}
          _first={{
            borderLeftRadius: 'md',
          }}
          _last={{
            borderRightRadius: 'md',
          }}
          isDisabled={variant === activeVariant}
          _disabled={{
            opacity: '1',
          }}
          sx={variant === activeVariant ? {
            pointerEvents: 'none',
            color: 'white',
            backgroundColor: 'gray.700',
          } : {}}
        />
      ))}
    </Box>
  );
};

export const VisualNovelListOptions = memo(VisualNovelListOptionsComponent);
