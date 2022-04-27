/** SidebarElementType. */
export enum SidebarElementType {
  'Link' = 'link',
  'Heading' = 'heading',
}

/**
 * SidebarLinkElement.
 */
export type SidebarLinkElement = {

  /** Type. */
  readonly type: SidebarElementType.Link;

  /** Text. */
  readonly text: string;

    /** Whether link is external. */
    readonly isDisabled?: boolean;

} & (
  {

  /** Whether link is external. */
  readonly isDisabled?: false;

  /** Link. */
  readonly link: string;

  /** Whether link is external. */
  readonly isExternal?: boolean;
  } | {

  /** Whether link is external. */
  readonly isDisabled: true;
  }
);

/**
 * SidebarHeadingElement.
 */
export interface SidebarHeadingElement {

  /** Type. */
  readonly type: SidebarElementType.Heading;

  /** Text. */
  readonly text: string;

  /** Items. */
  readonly items: readonly SidebarLinkElement[];
}

export type SidebarElement = SidebarHeadingElement | SidebarLinkElement;

export const data: SidebarElement[] = [
  { type: SidebarElementType.Link, text: 'Random visual novel', isDisabled: true },
  {
    type: SidebarElementType.Heading,
    text: 'Lists',
    items: [
      { type: SidebarElementType.Link, text: 'Visual novels', link: '/search/vn' },
      { type: SidebarElementType.Link, text: 'Characters', link: '/search/character' },
      { type: SidebarElementType.Link, text: 'Releases', isDisabled: true },
      { type: SidebarElementType.Link, text: 'Producers', isDisabled: true },
      { type: SidebarElementType.Link, text: 'Staff', isDisabled: true },
      { type: SidebarElementType.Link, text: 'Tags', isDisabled: true },
      { type: SidebarElementType.Link, text: 'Traits', isDisabled: true },
    ],
  },
  {
    type: SidebarElementType.Heading,
    text: 'vndb',
    items: [
      { type: SidebarElementType.Link, text: 'Home', link: 'https://vndb.org/', isExternal: true },
      { type: SidebarElementType.Link, text: 'Source code', link: 'https://code.blicky.net/yorhel/vndb', isExternal: true },
    ],
  },
  {
    type: SidebarElementType.Heading,
    text: 'vndbre',
    items: [{ type: SidebarElementType.Link, text: 'Source code', link: 'https://github.com/vndbre/vndbre', isExternal: true }],
  },
];
