import type { FC } from 'react';
import { memo } from 'react';
import type { PropsWithChildrenAndClass } from 'src/types/propsWithClass';
import NextLink from 'next/link';
import { cva, cx } from 'class-variance-authority';

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
  const link = cva([className, ''], {
    variants: {
      color: {
        'never': '',
        'on-hover': 'hover:text-primary-500',
        'always': 'text-primary-500',
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

  const linkProps = {
    href,
    className: isUnstyled ? className : cx(link(props)),
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
      prefetch={false}
      {...linkProps}
    >
      {children}
    </NextLink>
  );
};

export const Link = memo(LinkComponent);
