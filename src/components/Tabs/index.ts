import { Tab } from './Tab';
import { Tabs as _Tabs } from './Tabs';
import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import type { TabsProps } from './Tabs';
import type { TabsListProps } from './TabsList';
import type { TabProps as TabsTabProps } from './Tab';
import type { TabsContentProps } from './TabsContent';

const Root = _Tabs;
const List = TabsList;
const Content = TabsContent;

export const Tabs = {
  Root,
  List,
  Tab,
  Content,
};

export type {
  TabsProps,
  TabsListProps,
  TabsTabProps,
  TabsContentProps,
};
