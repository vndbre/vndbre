import type { PropsWithChildren, FC } from 'react';
import React, { createContext, useMemo, useContext } from 'react';
import type { ButtonIntent, ButtonSize } from '../Button/Button';

interface ButtonGroupContext {

  /** Intent. */
  readonly intent?: ButtonIntent;

  /** Size. */
  readonly size?: ButtonSize;

  /** Whether button group is disabled. */
  readonly isDisabled?: boolean;
}

const buttonGroupContext = createContext({});

type ButtonGroupProps =
& PropsWithChildren
& ButtonGroupContext;

/** Button group provider. */
export const ButtonGroupProvider: FC<ButtonGroupProps> = ({ children, ...props }) => (
  <buttonGroupContext.Provider value={props}>
    {children}
  </buttonGroupContext.Provider>
);

/** Button group context hook. */
export const useButtonGroupContext = (): ButtonGroupContext => useContext(buttonGroupContext);
