import React, { FC } from 'react';

import BBCodeUntyped from '@bbob/react/es/Component';
import reactPreset from '@bbob/preset-react/es';

import cls from './BBCode.module.css';

/**
 * Typed BBCode component.
 */
export const BBCode: FC = ({ children }) => (
  <BBCodeUntyped plugins={reactPreset()} componentProps={{ className: cls.bbcode }}>
    {children}
  </BBCodeUntyped>
);
