import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useCallback, memo } from 'react';
import { useForm } from 'react-hook-form';
import { ControlWrapper } from 'src/components/controls/ControlWrapper';
import { TextInput } from 'src/components/controls/TextInput';
import { Icon } from 'src/components/Icon/Icon';
import { IconButton } from 'src/components/IconButton/IconButton';
import { Input } from 'src/components/Input/Input';
import { LanguageSelect } from 'src/components/LanguageSelect/LanguageSelect';
import { PlatformSelect } from 'src/components/PlatformSelect/PlatformSelect';
import { z } from 'zod';

const validationSchema = z.object({
  search: z.string(),
});

type SearchFormValues = z.infer<typeof validationSchema>;

const searchFormInitialValues: SearchFormValues = {
  search: '',
};

/** Visual novel overview tab. */
const VnSearchComponent: FC = () => {
  const {
    control,
    handleSubmit,
  } = useForm({ defaultValues: searchFormInitialValues, resolver: zodResolver(validationSchema) });

  const handleFormSubmit = useCallback((data: SearchFormValues) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex w-full flex-1 items-end gap-4">
        <ControlWrapper>
          <TextInput name="search" control={control} placeholder="Search" leftElement={<Icon name="search" />} />
        </ControlWrapper>
        <div className="w-full max-w-[240px]">
          <ControlWrapper label="Language">
            <LanguageSelect isMulti />
          </ControlWrapper>
        </div>
        <div className="w-full max-w-[240px]">
          <ControlWrapper label="Platform">
            <PlatformSelect isMulti />
          </ControlWrapper>
        </div>
        <div className="w-full max-w-[240px]">
          <ControlWrapper label="Tags">
            <LanguageSelect isMulti />
          </ControlWrapper>
        </div>
        <IconButton name="options" className="bg-gray-100 p-3 text-gray-900" />
      </div>
    </form>
  );
};

export const VnSearch = memo(VnSearchComponent);
