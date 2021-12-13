import { Heading, Link } from '@chakra-ui/react';
import React, { memo, VFC } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './Sidebar.module.css';

/** Sidebar element type. */
enum SidebarElementType {
  'Link' = 'link',
  'Heading' = 'heading',
}

interface SidebarLinkElement {

  /** Type. */
  type: SidebarElementType.Link;

  /** Text. */
  text: string;

  /** Link. */
  link: string;
}

interface SidebarHeadingElement {

  /** Type. */
  type: SidebarElementType.Heading;

  /** Text. */
  text: string;

  /** Items. */
  items: SidebarLinkElement[];
}

type SidebarElement = SidebarHeadingElement | SidebarLinkElement;

const data: SidebarElement[] = [
  { type: SidebarElementType.Link, text: 'Random visual novel', link: '#' },
  {
    type: SidebarElementType.Heading,
    text: 'Lists',
    items: [
      { type: SidebarElementType.Link, text: 'Visual novels', link: '#' },
      { type: SidebarElementType.Link, text: 'Releases', link: '#' },
      { type: SidebarElementType.Link, text: 'Producers', link: '#' },
      { type: SidebarElementType.Link, text: 'Staff', link: '#' },
      { type: SidebarElementType.Link, text: 'Characters', link: '#' },
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

/**
 * Sidebar.
 */
export const Sidebar: VFC = memo(() => (
  <aside className={cls.sidebar}>
    <div className={cls.logo}>vndbre</div>
    {data.map(el => {
      switch (el.type) {
        case SidebarElementType.Heading: {
          return (
            <>
              <Heading className={cls.heading}>{el.text}</Heading>
              {el.items.map(_el => <Link as={NavLink} to={_el.link}>{_el.text}</Link>)}
            </>
          );
        }
        case SidebarElementType.Link: {
          return <Link as={NavLink} to={el.link}>{el.text}</Link>;
        }
        default: {
          return null;
        }
      }
    })}
  </aside>
));
