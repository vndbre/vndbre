/* eslint-disable jsx-a11y/label-has-associated-control */
import type { FC } from 'react';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import type { Settings as SettingsFormValues } from 'src/api/models/settings/settings';
import { useSettings } from 'src/hooks/useSettings';
import { Checkbox } from '../Checkbox/Checkbox';
import { Field } from '../Field/Field';
import { Form } from '../Form/Form';
import { IconButton } from '../IconButton/IconButton';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/Popover';
import { RadioGroup } from '../RadioGroup';

/** Display settings component. */
export const DisplaySettings: FC = () => {
  const [settings, setSettings] = useSettings();

  const methods = useForm({
    defaultValues: settings,
  });
  const { control } = methods;
  const values = useWatch({ control }) as SettingsFormValues;

  useEffect(() => {
    setSettings(values);
  }, [values]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton intent="quaternary" name="view" className="shrink-0" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[calc(var(--radix-popper-available-width)-24px)] p-4 md:w-[360px]">
        <Form {...methods}>
          <div className="flex flex-col gap-4">
            <Field Component={RadioGroup.Root} control={control} name="imageDisplaySettings.sexualLevel">
              <div className="flex flex-col gap-4">

                <span className="text-caption-20 font-medium text-gray-500">
                  Sexual and suggestive
                </span>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="none" id="safeSexLevel" className="shrink-0" />
                  <label className="text-caption-20 flex flex-col font-medium" htmlFor="safeSexLevel">
                    Safe images
                    <span className="text-caption-18 font-medium text-gray-500">
                      Hide sexually suggestive or explicit images
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="suggestive" id="suggestiveSexLevel" className="shrink-0" />
                  <label htmlFor="suggestiveSexLevel" className="text-caption-20 flex flex-col font-medium">
                    Suggestive images
                    <span className="text-caption-18 font-medium text-gray-500">
                      Hide only sexually explicit images
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="all" id="fullSexLevel" className="shrink-0" />
                  <label className="text-caption-20 flex flex-col font-medium" htmlFor="fullSexLevel">
                    All images
                    <span className="text-caption-18 font-medium text-gray-500">
                      Don&apos;t hide suggestive or explicit images
                    </span>
                  </label>
                </div>

              </div>
            </Field>

            <Field Component={RadioGroup.Root} control={control} name="imageDisplaySettings.violenceLevel">
              <div className="flex flex-col gap-4">

                <span className="text-caption-20 font-medium text-gray-500">
                  Violent and brutal
                </span>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="none" id="safeViolenceLevel" className="shrink-0" />
                  <label className="text-caption-20 flex flex-col font-medium" htmlFor="safeViolenceLevel">
                    Safe images
                    <span className="text-caption-18 font-medium text-gray-500">
                      Hide violent or brutal images
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="suggestive" id="brutalViolenceLevel" className="shrink-0" />
                  <label htmlFor="brutalViolenceLevel" className="text-caption-20 flex flex-col font-medium">
                    Brutal images
                    <span className="text-caption-18 font-medium text-gray-500">
                      Hide only brutal images
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="all" id="fullViolenceLevel" className="shrink-0" />
                  <label className="text-caption-20 flex flex-col font-medium" htmlFor="fullViolenceLevel">
                    All images
                    <span className="text-caption-18 font-medium text-gray-500">
                      Don&apos;t hide violent or brutal images
                    </span>
                  </label>
                </div>

              </div>
            </Field>

            <div className="border-b border-gray-300" />

            <div className="flex items-center gap-3">
              <Controller
                control={control}
                name="hideSexualTags"
                render={({ field: { value, ...rest } }) => (
                  <Checkbox {...rest} checked={value} id="hideSexualTags" />
                )}
              />
              <label htmlFor="hideSexualTags" className="text-caption-20 font-medium">
                Hide sexual tags/traits
              </label>
            </div>

            <Field Component={RadioGroup.Root} control={control} name="spoilerLevel">
              <div className="flex flex-col gap-4">

                <span className="text-caption-20 font-medium text-gray-500">
                  Spoilers
                </span>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="none" id="noneSpoilerLevel" className="shrink-0" />
                  <label className="text-caption-20 font-medium" htmlFor="noneSpoilerLevel">
                    Hide spoilers
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="minor" id="minorSpoilerLevel" className="shrink-0" />
                  <label htmlFor="minorSpoilerLevel" className="text-caption-20 font-medium">
                    Show minor spoilers
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroup.Item value="major" id="majorSpoilerLevel" className="shrink-0" />
                  <label className="text-caption-20 font-medium" htmlFor="majorSpoilerLevel">
                    Show all spoilers
                  </label>
                </div>

              </div>
            </Field>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
