import type { FC } from 'react';
import React, { memo } from 'react';
import { Tabs } from 'src/components/Tabs/Tabs';
import { TabsList } from 'src/components/Tabs/TabsList';
import { Tab } from 'src/components/Tabs/Tab';

export type TabValue = keyof typeof tabs;
const tabs = {
  overview: 'Overview',
  releases: 'Releases',
  characters: 'Characters',
  relations: 'Relations',
  media: 'Media',
};
const tabValues = Object.keys(tabs) as TabValue[];

const disabledTabs: TabValue[] = ['characters', 'relations', 'media'];

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
  <Tabs
    asChild
    activationMode="manual"
    value={value}
    onValueChange={onChange as ((value: string) => void)}
  >
    <TabsList>
      {tabValues.map(tabValue => (
        <Tab
          key={tabValue}
          value={tabValue}
          isDisabled={disabledTabs.includes(tabValue)}
        >
          {tabs[tabValue]}
        </Tab>
      ))}
    </TabsList>
  </Tabs>
);

export const VnHeaderTabs = memo(VnHeaderTabsComponent);
