import React, { Fragment, VFC } from 'react';
import { Heading, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import cls from './Sidebar.module.css';
import { data, SidebarElementType } from './data';

/**
 * Sidebar.
 */
export const Sidebar: VFC = () => (
  <aside className={cls.sidebar}>
    <Heading as="h2" size="md" className={cls.logo}>vndbre</Heading>
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
  </aside>
);
