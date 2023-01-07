import type { FC } from 'react';
import React, { memo } from 'react';
import type { PropsWithChildrenAndClass } from 'src/utils/PropsWithClass';
import NextLink from 'next/link';
import { cva, cx } from 'class-variance-authority';

interface Props {

  /** Navigation URL. */
  readonly href: string;

  /** Whether a link leads to external page. */
  readonly external?: boolean;

  /** Whether the primary color be applied to a link. */
  readonly color?: boolean;

  /** Whether a link should be underlined. */
  readonly hasUnderline?: boolean;
}

/** Link. */
const LinkComponent: FC<PropsWithChildrenAndClass<Props>> = (
  {
    href,
    className,
    external = false,
    children,
    ...props
  },
) => {
  const link = cva([
    'whitespace-nowrap leading-7 focus:outline-none ring-primary-300 focus-visible:ring-4',
    className,
  ], {
    variants: {
      color: {
        true: 'text-primary-500',
      },
      hasUnderline: {
        true: 'border-b border-solid',
      },
    },
    compoundVariants: [
      {
        color: false,
        hasUnderline: true,
        class: 'border-black',
      },
      {
        color: true,
        hasUnderline: true,
        class: 'border-primary-500',
      },
    ],
    defaultVariants: {
      color: true,
      hasUnderline: false,
    },
  });

  if (external) {
    return (
      <a
        href={href}
        className={cx(link(props))}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return <NextLink href={href} className={cx(link(props))}>{children}</NextLink>;
};

export const Link = memo(LinkComponent);
