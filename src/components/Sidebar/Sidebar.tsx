import React, { Fragment, VFC } from 'react';
import { Heading, Link, IconButton, HStack, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import cls from './Sidebar.module.css';
import { data, SidebarElementType } from './data';
import { Icon } from '../Icon/Icon';

interface Props {

  /** Callback to run when the sidebar should hide. */
  readonly onSidebarHide: () => void;
}

/**
 * Sidebar.
 */
export const Sidebar: VFC<Props> = ({ onSidebarHide }) => (
  <aside className={cls.sidebar}>
    <HStack className={cls.logo} justifyContent="space-between" alignItems="center" flexShrink={0} height={16}>
      <Heading as="h2" size="md">vndbre</Heading>
      <IconButton
        onClick={onSidebarHide}
        aria-label="Toggle sidebar"
        variant="ghost"
        colorScheme="gray"
        icon={<Icon name="carbon:close" />}
      />
    </HStack>
    <Box className={cls.navigation}>
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
    </Box>
  </aside>
);
