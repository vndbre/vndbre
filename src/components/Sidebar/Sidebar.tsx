import { Heading, Link } from '@chakra-ui/react';
import React, { Fragment, memo, VFC } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './Sidebar.module.css';
import { data, SidebarElementType } from './data';

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
            <Fragment key={el.text + el.type}>
              <Heading size="sm" className={cls.heading}>{el.text}</Heading>
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
));
