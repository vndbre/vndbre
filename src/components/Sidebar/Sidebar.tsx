import React, { Fragment, VFC } from 'react';
import { Heading, Link, IconButton, VStack, HStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import cls from './Sidebar.module.css';
import { data, SidebarElementType } from './data';
import { Icon } from '../Icon/Icon';

interface Props {

  /** Envoken on sidebar visibility toggle. */
  onSiderbarHide: () => unknown;
}

/**
 * Sidebar.
 */
export const Sidebar: VFC<Props> = ({ onSiderbarHide }) => (
  <aside className={cls.sidebar}>
    <HStack className={cls.logo} justifyContent="space-between" alignItems="center" flexShrink={0} height={16}>
      <Heading as="h2" size="md">vndbre</Heading>
      <IconButton
        onClick={() => onSiderbarHide()}
        aria-label="Toggle sidebar"
        variant="ghost"
        colorScheme="gray"
        icon={<Icon name="carbon:close" />}
      />
    </HStack>
    <div className={cls.navigation}>
      {data.map(el => {
        switch (el.type) {
          case SidebarElementType.Heading: {
            return (
              <Fragment key={el.text + el.type}>
                <Heading as="h3" size="sm" className={cls.heading}>{el.text}</Heading>
                {el.items.map(_el => (
                  <Link
                    key={_el.link + _el.text}
                    as={NavLink}
                    to={_el.link}
                    variant="no-underline"
                    className={cls.link}
                  >
                    {_el.text}
                  </Link>
                ))}
              </Fragment>
            );
          }
          case SidebarElementType.Link: {
            return (
              <Link
                key={el.link + el.text}
                as={NavLink}
                to={el.link}
                variant="no-underline"
                className={cls.link}
              >
                {el.text}
              </Link>
            );
          }
          default: {
            return null;
          }
        }
      })}
    </div>
  </aside>
);
