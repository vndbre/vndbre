import type { FC } from 'react';
import React, { memo } from 'react';
import type { StrictOmit } from 'src/api/utils/strictOmit';
import type { PropsWithClass } from 'src/utils/PropsWithClass';
import type { IconName } from '../Icon/Icon';
import { Icon } from '../Icon/Icon';
import type { SelectOption, SelectProps } from '../Select';
import { Select } from '../Select';

const languageCodes = ['en', 'ru', 'jp', 'cn', 'se', 'bd'] as const;

type LanguageCode = typeof languageCodes[number];
interface LanguageInfo {

  /** Label. */
  readonly label: string;

  /** Icon name. */
  readonly iconName: IconName;
}

const languagesMap: Record<LanguageCode, LanguageInfo> = {
  en: { label: 'English', iconName: 'flag-united-states' },
  ru: { label: 'Russian', iconName: 'flag-russia' },
  jp: { label: 'Japanese', iconName: 'flag-japan' },
  cn: { label: 'Chinese', iconName: 'flag-china' },
  se: { label: 'Swedish', iconName: 'flag-sweden' },
  bd: { label: 'Bengali', iconName: 'flag-bangladesh' },
};

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
 * TODO: Extract language logic into service. It just a proof of concept.
 */
const LanguageSelectComponent: FC<PropsWithClass<Props>> = ({
  activeLanguages,
  ...props
}) => {
  const availableLanguageCodes = activeLanguages ?? languageCodes;
  const options: SelectOption[] = availableLanguageCodes.map(code => ({
    label: languagesMap[code].label,
    icon: <Icon name={languagesMap[code].iconName} />,
    value: code,
  }));
  return (
    <Select {...props} options={options} />
  );
};

export const LanguageSelect = memo(LanguageSelectComponent);
