import type { FC } from 'react';
import { memo } from 'react';
import NextLink from 'next/link';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import type { PropsWithChildrenAndClass } from '@/types/propsWithClass';

/** Link props. */
export interface LinkProps {

  /** Navigation URL. */
  readonly href: string;

  /** Whether a link leads to external page. */
  readonly external?: boolean;
}

type Variant = 'never' | 'on-hover' | 'always';

interface Props extends LinkProps {

  /** Whether the color changes to primary on hover. */
  readonly color?: Variant;

  /** Whether the underline appears on hover. */
  readonly underline?: Variant;

  /** Whether link is unstyled. */
  readonly isUnstyled?: boolean;
}

const link = cva('', {
  variants: {
    color: {
      'never': '',
      'on-hover': 'hover:text-primary',
      'always': 'text-primary',
    },
    underline: {
      'never': '',
      'on-hover': 'hover:underline',
      'always': 'underline',
    },
  },
  defaultVariants: {
    color: 'always',
    underline: 'on-hover',
  },
});

/** Link. */
const LinkComponent: FC<PropsWithChildrenAndClass<Props>> = (
  {
    href,
    className,
    external = false,
    children,
    isUnstyled,
    ...props
  },
) => {
  const linkProps = {
    href,
    className: isUnstyled ? className : cn(link(props), className),
  };

  if (external) {
    return (
      <a
        {...linkProps}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <NextLink
      {...linkProps}
    >
      {children}
    </NextLink>
  );
};

export const Link = memo(LinkComponent);
