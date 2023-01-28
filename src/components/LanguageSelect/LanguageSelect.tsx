import type { FC } from 'react';
import React, { memo } from 'react';
import { LanguageCode, LANGUAGES_CODE } from 'src/api/models/language';

import type { StrictOmit } from 'src/api/utils/strictOmit';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import { Icon } from '../Icon/Icon';
import type { SelectOption, SelectProps } from '../Select';
import { Select } from '../Select';

type Props =
& StrictOmit<
  SelectProps,
  | 'options'
>
& {
  readonly activeLanguages?: readonly LanguageCode[];
};

/**
 * Language select component.
 */
const LanguageSelectComponent: FC<PropsWithClass<Props>> = ({
  activeLanguages,
  ...props
}) => {
  const availableLanguageCodes = activeLanguages ?? LANGUAGES_CODE;
  const options: SelectOption[] = availableLanguageCodes.map(code => ({
    label: LanguageCode.toReadable(code),
    icon: <Icon name={LanguageCode.getLanguageIconName(code)} />,
    value: code,
  }));
  return (
    <Select {...props} options={options} />
  );
};

export const LanguageSelect = memo(LanguageSelectComponent);
