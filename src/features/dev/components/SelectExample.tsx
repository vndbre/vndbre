import type { FC } from 'react';
import React, { memo } from 'react';
import { Icon } from 'src/components/Icon/Icon';
import { LanguageSelect } from 'src/components/LanguageSelect/LanguageSelect';
import type { Option } from 'src/components/Select/Option';
import { Select } from 'src/components/Select/Select';

const options: Option[] = [
  {
    value: 'ru',
    label: 'Russia',
  },
  {
    value: 'cn',
    label: 'China',
    icon: <Icon name="flag" />,
  },
  {
    value: 'js',
    label: 'Japan',
  },
  {
    value: 'us',
    label: 'AmericaAmericaAmerica',
    icon: <Icon name="star" />,
  },
];

/** Select example. */
const SelectExampleComponent: FC = () => (
  <div className="flex flex-row flex-wrap gap-4">
    <Select
      placeholder="Select one with search"
      disableSearch
      options={options}
      className="w-full max-w-[240px]"
    />
    <Select
      placeholder="Select one"
      disableSearch
      options={options}
      className="w-full max-w-[240px]"
    />
    <Select
      placeholder="Select multi  with search"
      isMulti
      options={options}
      className="w-full max-w-[240px]"
    />
    <Select
      placeholder="Select multi"
      isMulti
      disableSearch
      options={options}
      className="w-full max-w-[240px]"
    />
    <LanguageSelect
      placeholder="Select languages"
      isMulti
      disableSearch
      className="w-full max-w-[240px]"
    />
    <LanguageSelect
      placeholder="Select language"
      className="w-full max-w-[240px]"
    />
  </div>
);

export const SelectExample = memo(SelectExampleComponent);
