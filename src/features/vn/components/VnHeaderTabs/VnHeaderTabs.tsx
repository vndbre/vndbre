import type { FC } from 'react';
import React, { memo } from 'react';
import { Tabs } from 'src/components/Tabs';

const tabs = {
  overview: 'Overview',
  releases: 'Releases',
  characters: 'Characters',
  relations: 'Relations',
  media: 'Media',
};

export type TabValue = keyof typeof tabs;

const tabValues = Object.keys(tabs) as readonly TabValue[];

const disabledTabs: readonly TabValue[] = ['characters', 'relations', 'media'];

interface Props {

  /** Active tab value. */
  readonly value: TabValue;

  /** Change callback. */
  readonly onChange?: (value: TabValue) => void;
}

/** Tabs. */
const VnHeaderTabsComponent: FC<Props> = ({
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

export const VnHeaderTabs = memo(VnHeaderTabsComponent);
