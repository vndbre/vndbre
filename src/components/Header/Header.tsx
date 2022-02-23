import { Heading, HStack, IconButton } from '@chakra-ui/react';
import React, { VFC } from 'react';
import { Icon } from '../Icon/Icon';
import cls from './Header.module.css';

interface Props {

  /** Whether logo and sidebar toggle button are shown. */
  showLogo: boolean;

  /** Show sidebar. */
  onSiderbarShow: () => unknown;
}

/**
 * TODO: Implement header funtionality.
 */
export const Header: VFC<Props> = ({ showLogo, onSiderbarShow }) => (
  <header className={cls.header}>
    {showLogo && (
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={() => onSiderbarShow()}
          aria-label="Toggle sidebar"
          variant="ghost"
          colorScheme="gray"
          icon={<Icon name="carbon:menu" />}
        />
        <Heading as="h2" size="md">vndbre</Heading>
      </HStack>
    )}
    <div className={cls.search}>
      <Icon name="carbon:search" />
      <span>Search</span>
    </div>
    <div className={cls.profile}>
      <Icon name="carbon:user-avatar" size={32} />
      <span>Profile</span>
    </div>
    <Icon name="carbon:notification" size={32} />
    <Icon name="carbon:add" size={36} />
  </header>
);
