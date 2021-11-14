import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BBCodeUntyped from '@bbob/react/es/Component';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import reactPreset from '@bbob/preset-react/es';

/**
 * Typed BBCode component.
 */
export const BBCode: FC = ({ children }) => (
  <BBCodeUntyped plugins={reactPreset()}>
    {children}
  </BBCodeUntyped>
);
