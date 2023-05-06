import type { FC } from 'react';
import { memo } from 'react';
import { Tabs } from 'src/components/Tabs';
import NextLink from 'next/link';

const tabs = {
  vn: 'Visual novels',

  release: 'Releases',
  character: 'Characters',
};

export type TabValue = keyof typeof tabs;

const tabValues = Object.keys(tabs) as readonly TabValue[];

const disabledTabs: readonly TabValue[] = ['release'];

interface Props {

  /** Active tab value. */
  readonly value: TabValue;

  /** Change callback. */
  readonly onChange?: (value: TabValue) => void;
}

// TODO: Refactor tabs, make it reusable.
/** Tabs. */
const SearchHeaderTabsComponent: FC<Props> = ({
  value,
  onChange,
}) => (
  <Tabs.Root
    asChild
    activationMode="manual"
    value={value}

    // Making tabs think that it works with `strings`, but it actually works with `TabValue` union.
    onValueChange={onChange as ((value: string) => void)}
  >
    <Tabs.List>
      {tabValues.map(tabValue => (
        <Tabs.Tab
          as={NextLink}
          href={`/search/${tabValue}`}
          key={tabValue}
          value={tabValue}
          isDisabled={disabledTabs.includes(tabValue)}
        >
          {tabs[tabValue]}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  </Tabs.Root>
);

export const SearchHeaderTabs = memo(SearchHeaderTabsComponent);
