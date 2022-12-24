import clsx from 'clsx';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import { cloneElement, memo, Children } from 'react';

/**
 * Button group.
 * @example
 * ```
 * <ButtonGroup>
 *   <Button hasSmallPaddings intent="secondary">Add to list</Button>
 *   <IconButton name="chevron-down" intent="secondary" />
 * </ButtonGroup>
 * ```
 */
const ButtonGroupComponent: FC<PropsWithChildren> = ({ children }) => {
  const childrenCount = Children.toArray(children).length;

  if (childrenCount === 1) {
    return <>{children}</>;
  }

  const childrenWithProps = Children.map(children, (child, index) => {
    const className = clsx({
      /* eslint-disable @typescript-eslint/naming-convention */
      'rounded-r-none': index === 0,
      'rounded-none': index > 0 && index < (childrenCount - 1),
      'rounded-l-none': index === (childrenCount - 1),
    });
    return cloneElement(child as ReactElement, { className });
  });

  return (
    <div className="flex">{childrenWithProps}</div>
  );
};

export const ButtonGroup = memo(ButtonGroupComponent);
