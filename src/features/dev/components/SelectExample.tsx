import type { FC } from 'react';
import React, { useState, memo } from 'react';
import { Icon } from 'src/components/Icon/Icon';
import { LanguageSelect } from 'src/components/LanguageSelect/LanguageSelect';
import type { SelectOption } from 'src/components/Select';
import { Select } from 'src/components/Select';

const options: SelectOption[] = [
  {
    value: 'ru',
    label: 'Russia',
  },
  {
    value: 'js',
    label: 'Japan',
  },
  {
    value: 'cn',
    label: 'China',
    icon: <Icon name="flag" />,
  },
  {
    value: 'us',
    label: 'AmericaAmericaAmerica',
    icon: <Icon name="star" />,
  },
];

/** Select example. */
const SelectExampleComponent: FC = () => {
  const [option, setOption] = useState<SelectOption | null>();

  return (
    <div className="flex flex-row flex-wrap gap-4">
      <div className="w-full">
        label:
        {' '}
        {option?.label}
      </div>
      <Select
        placeholder="Select one with search"
        options={options}
        className="w-full max-w-[240px]"
        onChange={value => setOption(value)}
      />
      <Select
        placeholder="Select one"
        disableSearch
        isClearable
        options={options}
        className="w-full max-w-[240px]"
        onChange={value => setOption(value)}
      />
      <Select
        placeholder="Select multi  with search"
        isMulti
        isClearable
        options={options}
        className="w-full max-w-[240px]"
        onChange={value => setOption(value.at(-1))}
      />
      <Select
        placeholder="Select multi"
        isMulti
        disableSearch
        options={options}
        className="w-full max-w-[240px]"
        onChange={value => setOption(value.at(-1))}
      />
      <LanguageSelect
        placeholder="Select languages"
        isMulti
        disableSearch
        className="w-full max-w-[240px]"
        onChange={value => setOption(value.at(-1))}
      />
      <LanguageSelect
        placeholder="Select languages"
        isMulti
        disableSearch
        className="w-full max-w-[240px]"
        onChange={value => setOption(value.at(-1))}
      />
      <LanguageSelect
        placeholder="Select language"
        className="w-full max-w-[240px]"
        onChange={value => setOption(value)}
      />
      <LanguageSelect
        placeholder="Select language"
        className="w-full max-w-[240px]"
        onChange={value => setOption(value)}
      />
    </div>
  );
};

export const SelectExample = memo(SelectExampleComponent);
