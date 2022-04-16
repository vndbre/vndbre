import React, { memo, useCallback, VFC } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovelListVariant } from '../VisualNovelList/VisualNovelList';
import { buttonOptions } from './data';

interface Props {

  /** Active variant.  */
  readonly activeVariant: VisualNovelListVariant;

  /** Variant change handler.  */
  readonly onVariantChange: (variant: VisualNovelListVariant) => void;
}

/** Visual novel list options. */
const VisualNovelListOptionsComponent: VFC<Props> = ({ activeVariant, onVariantChange }) => {
  const handleIconClick = useCallback((variant: VisualNovelListVariant) => () => onVariantChange(variant), [onVariantChange]);

  return (
    <Box>
      {buttonOptions.map(({ icon, variant, label }) => (
        <IconButton
          key={variant}
          onClick={handleIconClick(variant)}
          aria-label={label}
          icon={<Icon name={icon} />}
          borderRadius="none"
          colorScheme="gray"
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
