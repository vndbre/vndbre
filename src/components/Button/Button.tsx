import React, { memo } from 'react';
import type { ButtonHTMLAttributes, FC } from 'react';
import { cva, cx } from "class-variance-authority";
import type { PropsWithChildrenAndClass } from '../../utils/PropsWithClass';

interface Props {
  readonly intent?: 'primary' | 'secondary';

  readonly type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const ButtonComponent: FC<PropsWithChildrenAndClass<Props>> = ({
  children,
  type = 'button',
  className,
  ...props
}) => {
  const button = cva(['py-3 px-6 rounded focus:outline-none ring-primary-300 focus-visible:ring-4 transition-colors', className], {
    variants: {
      intent: {
        primary: 'bg-primary-500 text-white hover:bg-primary-400',
        secondary: 'bg-gray-200 text-black hover:bg-gray-300',
      }
    },
    defaultVariants: {
      intent: 'primary'
    }
  })

  return (
    <button
      type={type}
      className={cx(button(props))}
    >{children}</button>
  )
};

export const Button = memo(ButtonComponent);