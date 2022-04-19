import React, { memo, VFC } from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { Icon } from '../../../../components/Icon/Icon';

interface Props<T = string> {

  /** Title. */
  readonly title?: string;

  /** Items position alignment. */
  readonly alignment?: 'start' | 'end';

  /** Items. */
  readonly items: readonly T[];

  /** Readable mapper. */
  readonly readableMapper: (value: T) => string;

  /** Icon mapper. */
  readonly iconMapper: (value: T) => string;
}

/** Card list info box. */
const CardDetailListComponent: VFC<Props> = ({ title, alignment = 'start', items, readableMapper, iconMapper }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
  >
    {title != null && <Text fontWeight="semibold">{title}</Text>}
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      justifyContent={alignment}
    >
      {items.map((item, index) => (
        <Tooltip key={item + String(index)} label={readableMapper(item)}>
          <Text>
            <Icon name={iconMapper(item)} />
          </Text>
        </Tooltip>
      ))}
    </Box>
  </Box>
);

export const CardDetailList = memo(CardDetailListComponent) as
  <T extends string>(props: Props<T>) => ReturnType<VFC<Props>>;
