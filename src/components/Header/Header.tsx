import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';
import React, { VFC } from 'react';
import { Icon } from '../Icon/Icon';
import cls from './Header.module.css';

interface Props {

  /** Whether logo and sidebar toggle button are visible. */
  isLogoVisible: boolean;

  /** Callback to run when the sidebar shows up. */
  onSidebarShow: () => void;
}

/**
 * TODO: Implement header functionality.
 */
export const Header: VFC<Props> = ({ isLogoVisible, onSidebarShow }) => (
  <header className={cls.header}>
    {isLogoVisible && (
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={onSidebarShow}
          aria-label="Toggle sidebar"
          variant="ghost"
          colorScheme="gray"
          icon={<Icon name="carbon:menu" />}
        />
        <Heading as="h2" size="md">vndbre</Heading>
      </HStack>
    )}
    <Box className={cls.search}>
      <Icon name="carbon:search" />
      <span>Search</span>
    </Box>
    <Box className={cls.profile}>
      <Icon name="carbon:user-avatar" size={32} />
      <span>Profile</span>
    </Box>
    <Icon name="carbon:notification" size={32} />
    <Icon name="carbon:add" size={36} />
  </header>
);
