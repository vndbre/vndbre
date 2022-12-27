import type { FC } from 'react';
import React, { memo } from 'react';
import { Tab } from './Tab';

/** Tab. */
export interface TabItem {

  /** Tab name. */
  readonly name: string;

  /** Tab text. */
  readonly text: string;

  /** Is tab disabled. */
  readonly isDisabled?: boolean;
}

interface Props {

  /** Tabs. */
  readonly tabs: readonly TabItem[];

  /** Active tab name. */
  readonly activeName?: TabItem['name'];

  /** Change callback. */
  readonly onChange?: (name: TabItem['name']) => void;
}

/** Tabs. */
const TabsComponent: FC<Props> = ({
  tabs,
  activeName,
  onChange,
}) => (
  <div className="relative w-full flex overflow-x-auto">
    <div className="absolute bottom-0 left-0 -z-10 w-full border-b border-gray-200" />
    {tabs.map(tab => (
      <Tab
        key={tab.name}
        name={tab.name}
        isActive={tab.name === activeName}
        isDisabled={tab.isDisabled}
        onClick={onChange}
      >
        {tab.text}
      </Tab>
    ))}
  </div>
);

export const Tabs = memo(TabsComponent) as typeof TabsComponent;
