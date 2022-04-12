import React, { memo, useCallback, VFC } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovelListVariant } from '../VisualNovelList/VisualNovelList';

interface Props {

  /** Active variant.  */
  readonly activeVariant: VisualNovelListVariant;

  /** Variant change handler.  */
  readonly onVariantChange: (variant: VisualNovelListVariant) => void;
}

/** Visual novel list options. */
const VisualNovelListOptionsComponent: VFC<Props> = ({ activeVariant, onVariantChange }) => {
  const buttonOptions: {
    icon: string;
    variant: VisualNovelListVariant;
    label: string;
  }[] = [
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

  return (
    <Box>
      {buttonOptions.map(({ icon, variant, label }) => (
        <IconButton
          key={variant}
          onClick={useCallback(() => onVariantChange(variant), [onVariantChange])}
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