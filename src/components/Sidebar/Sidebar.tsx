import React, { Fragment, ReactNode, VFC } from 'react';
import { Heading, Link, IconButton, HStack, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import cls from './Sidebar.module.css';
import { data, SidebarElementType, SidebarListItem } from './data';
import { Icon } from '../Icon/Icon';

interface Props {

  /** Callback to run when the sidebar should hide. */
  readonly onSidebarHide: () => void;
}

/**
 * Gets link element.
 * @param element Sidebar link element.
 * @param index Element index.
 */
const getLink = (element: SidebarListItem, index?: number): ReactNode => {
  if (element.isDisabled) {
    return (
      <Box
        key={element.text + String(index)}
        pointerEvents="none"
        color="gray.400"
        fontSize="sm"
      >
        {element.text}
      </Box>
    );
  }

  const linkProps = {
    key: element.link + element.text,
    variant: 'no-underline',
    className: cls.link,
  };

  if (element.isExternal) {
    return (
      <Link
        {...linkProps}
        href={element.link}
        target="_blank"
      >
        {element.text}
      </Link>
    );
  }

  return (
    <Link
      {...linkProps}
      as={RouterLink}
      to={element.link}
    >
      {element.text}
    </Link>
  );
};

/** Sidebar. */
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
                {el.items.map(getLink)}
              </Fragment>
            );
          }
          case SidebarElementType.Link: {
            return getLink(el);
          }
          default: {
            return null;
          }
        }
      })}
    </Box>
  </aside>
);
