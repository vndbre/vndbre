import clsx from 'clsx';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import { cloneElement, memo, Children } from 'react';
import type { ButtonProps } from '../Button/Button';
import { ButtonGroupProvider } from './ButtonGroupProvider';

type Props =
& PropsWithChildren
& Pick<ButtonProps,
| 'intent'
| 'size'
| 'isDisabled'
>;

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
const ButtonGroupComponent: FC<Props> = ({ children, ...props }) => {
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
      /* eslint-enable @typescript-eslint/naming-convention */
    });
    return cloneElement(child as ReactElement, { className });
  });

  return (
    <ButtonGroupProvider {...props}>
      <div className="flex">{childrenWithProps}</div>
    </ButtonGroupProvider>
  );
};

export const ButtonGroup = memo(ButtonGroupComponent);
