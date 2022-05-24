import React, { memo, VFC } from 'react';
import { Text } from '@chakra-ui/react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { BBCode } from '../BBCode/BBCode';
import { HideContent } from '../HideContent/HideContent';

interface Props {

  /** Text. */
  readonly text: string | null;

  /** Desktop description height in pixels. */
  readonly desktopHeight?: number;

  /** Mobile description height in pixels. */
  readonly mobileHeight?: number;
}

/** Responsive description component. */
const DescriptionComponent: VFC<Props> = ({ text, desktopHeight = 146, mobileHeight = 100 }) => {
  const isMobile = useIsMobile();
  const height = isMobile ? mobileHeight : desktopHeight;

  if (text != null) {
    return (
      <HideContent maxHeight={height}>
        <BBCode text={text} />
      </HideContent>
    );
  }

  return (<Text>No description.</Text>);
};

export const Description = memo(DescriptionComponent);
