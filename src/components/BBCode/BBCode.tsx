import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BBCodeUntyped from '@bbob/react/es/Component';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import reactPreset from '@bbob/preset-react/es';

import cls from './BBCode.module.css';

/**
 * Typed BBCode component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BBCode: FC = ({ children }) => (
  <BBCodeUntyped plugins={reactPreset()} componentProps={{ className: cls.bbcode }}>
    {children}
  </BBCodeUntyped>
);
