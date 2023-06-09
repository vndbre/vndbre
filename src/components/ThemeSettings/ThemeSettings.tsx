'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import type { FC } from 'react';
import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { IconButton } from '../IconButton/IconButton';

/** Display settings component. */
export const ThemeSettings: FC = () => {
  const { theme, setTheme } = useTheme();
  const iconName = theme === 'light' ? 'sun' : 'moon';

  const handleClick = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [theme]);

  return (
    <IconButton
      onClick={handleClick}
      intent="quaternary"
      name={iconName}
      className="shrink-0"
    />
  );
};
