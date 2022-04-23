/** SidebarElementType. */
export enum SidebarElementType {
  'Link' = 'link',
  'Heading' = 'heading',
}

/**
 * SidebarLinkElement.
 */
export interface SidebarLinkElement {

  /** Type. */
  readonly type: SidebarElementType.Link;

  /** Text. */
  readonly text: string;

  /** Link. */
  readonly link: string;
}

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
  { type: SidebarElementType.Link, text: 'Random visual novel', link: '#' },
  {
    type: SidebarElementType.Heading,
    text: 'Lists',
    items: [
      { type: SidebarElementType.Link, text: 'Visual novels', link: 'search/vn' },
      { type: SidebarElementType.Link, text: 'Characters', link: 'search/character' },
      { type: SidebarElementType.Link, text: 'Releases', link: '#' },
      { type: SidebarElementType.Link, text: 'Producers', link: '#' },
      { type: SidebarElementType.Link, text: 'Staff', link: '#' },
      { type: SidebarElementType.Link, text: 'Tags', link: '#' },
      { type: SidebarElementType.Link, text: 'Traits', link: '#' },
    ],
  },
  {
    type: SidebarElementType.Heading,
    text: 'Community',
    items: [
      { type: SidebarElementType.Link, text: 'Users', link: '#' },
      { type: SidebarElementType.Link, text: 'Discussions', link: '#' },
    ],
  },
  {
    type: SidebarElementType.Heading,
    text: 'Help us',
    items: [
      { type: SidebarElementType.Link, text: 'Image Flagging', link: '#' },
      { type: SidebarElementType.Link, text: 'Add Visual Novel', link: '#' },
      { type: SidebarElementType.Link, text: 'Add Producer', link: '#' },
      { type: SidebarElementType.Link, text: 'Add Staff', link: '#' },
    ],
  },
  {
    type: SidebarElementType.Heading,
    text: 'Support vndb',
    items: [
      { type: SidebarElementType.Link, text: 'Patreon', link: '#' },
      { type: SidebarElementType.Link, text: 'SubscribeStar', link: '#' },
    ],
  },
  {
    type: SidebarElementType.Heading,
    text: 'vndb',
    items: [
      { type: SidebarElementType.Link, text: 'FAQ', link: '#' },
      { type: SidebarElementType.Link, text: 'About us', link: '#' },
      { type: SidebarElementType.Link, text: 'Recent changes', link: '#' },
      { type: SidebarElementType.Link, text: 'For developers', link: '#' },
      { type: SidebarElementType.Link, text: 'Source code', link: '#' },
      { type: SidebarElementType.Link, text: 'IRC', link: '#' },
      { type: SidebarElementType.Link, text: 'contact@vndb.org', link: '#' },
    ],
  },
  {
    type: SidebarElementType.Heading,
    text: 'vndb re',
    items: [
      { type: SidebarElementType.Link, text: 'Source code', link: '#' },
      { type: SidebarElementType.Link, text: 'Discord', link: '#' },
    ],
  },
  { type: SidebarElementType.Heading, text: 'Statistics', items: [] },
];
