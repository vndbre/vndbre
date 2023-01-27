import type { FC } from 'react';
import React, { useState, memo } from 'react';
import { Icon } from 'src/components/Icon/Icon';
import { LanguageSelect } from 'src/components/LanguageSelect/LanguageSelect';
import type { SelectOption } from 'src/components/Select';
import type { SelectChangeHandler } from 'src/components/Select/Select';
import { Select } from 'src/components/Select/Select';

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

  /**
   * Handle change.
   * @param value Value.
   */
  const handleChange: SelectChangeHandler = value => {
    if (value != null && 'length' in value) {
      return;
    }
    setOption(value);
  };

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
        onChange={handleChange}
      />
      <Select
        placeholder="Select one"
        disableSearch
        isClearable
        options={options}
        className="w-full max-w-[240px]"
        onChange={handleChange}
      />
      <Select
        placeholder="Select multi  with search"
        isMulti
        isClearable
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
        placeholder="Select languages"
        isMulti
        disableSearch
        size="lg"
        className="w-full max-w-[240px]"
      />
      <LanguageSelect
        placeholder="Select language"
        className="w-full max-w-[240px]"
        onChange={handleChange}
      />
      <LanguageSelect
        placeholder="Select language"
        className="w-full max-w-[240px]"
        size="lg"
        onChange={handleChange}
      />
    </div>
  );
};

export const SelectExample = memo(SelectExampleComponent);
