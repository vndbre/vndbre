import type { FC, ReactNode } from 'react';
import React, { useState, memo } from 'react';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import { Select } from '../SelectOld/Select';
import { SelectOption } from '../SelectOld/SelectOption';
import { Tag } from '../Tag/Tag';

/** Tag select option. */
export interface TagSelectOption {

  /** Unique value. */
  readonly value: string;

  /** Text to search by, if `element` isn't provided used as option readable text. */
  text: string;

  /** Option element. */
  element?: ReactNode;
}

interface Props {

  /** Options. */
  readonly options: readonly TagSelectOption[];
}

/** Tag select component. */
const TagSelectComponent: FC<PropsWithClass<Props>> = ({
  options,
  className,
}) => {
  const [query, setQuery] = useState('');
  const filteredOptions = options.filter(({ text }) => text.includes(query));
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const selectedOptions = options.filter(option => selectedValues.includes(option.value));
  const placeholder = selectedValues.length === 0 ? 'Search' : '';

  const tags = (
    <>
      {selectedOptions.length > 0 && (
        <Tag className="bg-gray-200">
          {selectedOptions[0]?.element ?? selectedOptions[0]?.text}
        </Tag>
      )}
      {selectedOptions.length > 1 && (
        <Tag className="bg-gray-200">
          +
          {selectedOptions.length - 1}
        </Tag>
      )}
    </>
  );

  return (
    <Select
      className={className}
      placeholder={placeholder}
      tags={tags}
      value={selectedValues}
      onInputChange={setQuery}
      onValueChange={setSelectedValues}
      onClear={() => setSelectedValues([])}
      isMulti
    >
      {filteredOptions.map(option => (
        <SelectOption
          key={option.value}
          value={option.value}
        >
          {option.element ?? option.text}
        </SelectOption>
      ))}
    </Select>
  );
};

export const TagSelect = memo(TagSelectComponent);
