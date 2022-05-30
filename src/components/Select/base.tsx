import React, { memo } from 'react';
import { CSSObject, Text } from '@chakra-ui/react';
import {
  Props as SelectProps,
  GroupBase,
  OptionProps,
  MultiValueGenericProps,
  chakraComponents,
} from 'chakra-react-select';
import { FormControlProps } from '../../utils/formControl';
import { Icon } from '../Icon/Icon';
import { SelectOption } from '../../utils/selectOption';

export namespace Select {

  /** Select base props. */
  export interface BaseProps extends FormControlProps {

    /** Label for the select. */
    readonly label: string;
  }

  export const BASE_COMPONENTS = {
  /** Removes default dropdown indicator. */
    DropdownIndicator: () => null,

    /** Removes default indicator separator. */
    IndicatorSeparator: () => null,
  };

  export namespace Single {

    /** Select props. */
    export interface Props extends BaseProps, Omit<SelectProps<SelectOption, false, GroupBase<SelectOption>>, 'name'> { }
  }

  export namespace Multi {

    /** Multi select props. */
    export interface Props extends BaseProps, Omit<SelectProps<SelectOption, true, GroupBase<SelectOption>>, 'name'> {

      /**
       * The maximum number of selected items to be displayed after which overflow would be applied to the remaining elements.
       *
       * If `displayLimit` equals to 0 (which is default value), no overflow would be applied.
       */
      readonly displayLimit?: number;
    }

    export const customChakraStyles = {

      /**
       * Sets styles for tag components inside multi select.
       * @param provided Styles object.
       */
      multiValue: (provided: CSSObject) => ({
        ...provided,
        background: 'gray.200',
        borderRadius: 'base',
      }),
    };

    /**
     * Obtains a list of child components for the `MultiSelect` component.
     * @param displayLimit Maximum amount of displayed options.
     * @param components Custom multi select components.
     */
    export const getComponents = (displayLimit: number, components: Props['components']): Props['components'] => ({
      ...BASE_COMPONENTS,

      /** Custom chakra option component with icon support for multi select. */
      Option: memo(({ children, ...optionProps }: OptionProps<SelectOption, true, GroupBase<SelectOption>>) => (
        <chakraComponents.Option {...optionProps}>
          {optionProps.data.icon && <Icon name={optionProps.data.icon} style={{ marginRight: 10 }} />}
          {children}
        </chakraComponents.Option>
      )),

      /** Custom chakra tag component with icon support for multi select. */
      MultiValueContainer: memo(({
        children,
        ...multiValueProps
      }: MultiValueGenericProps<SelectOption, true, GroupBase<SelectOption>>) => {
        const selectedOptions = multiValueProps.selectProps.value as SelectOption[];
        const itemIndex = selectedOptions.findIndex(item => item.value === multiValueProps.data.value);

        if (displayLimit === 0 || itemIndex < displayLimit) {
          return (
            <chakraComponents.MultiValueContainer {...multiValueProps}>
              {multiValueProps.data.icon && <Icon name={multiValueProps.data.icon} style={{ marginRight: 4 }} />}
              {children}
            </chakraComponents.MultiValueContainer>
          );
        }

        if (displayLimit === itemIndex) {
          return (
            <chakraComponents.MultiValueContainer {...multiValueProps}>
              <Text h={6} fontWeight="medium">
                +
                {selectedOptions.length - displayLimit}
              </Text>
            </chakraComponents.MultiValueContainer>
          );
        }

        return null;
      }),
      ...components,
    });
  }
}
