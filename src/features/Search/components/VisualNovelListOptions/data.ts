import { VisualNovelListVariant } from '../VisualNovelList/VisualNovelList';

interface ButtonOption {

  /**
   * Icon name.
   */
  readonly icon: string;

  /**
   * List variant.
   */
  readonly variant: VisualNovelListVariant;

  /**
   * Icon button label.
   */
  readonly label: string;
}

export const buttonOptions: ButtonOption[] = [
  {
    icon: 'carbon:menu',
    variant: 'table',
    label: 'Table',
  },
  {
    icon: 'carbon:grid',
    variant: 'cards',
    label: 'Cards',
  },
  {
    icon: 'carbon:show-data-cards',
    variant: 'wide-cards',
    label: 'Wide cards',
  },
  {
    icon: 'carbon:horizontal-view',
    variant: 'extended-cards',
    label: 'Extended Cards',
  },
];
