import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';
import React, { VFC } from 'react';
import { Icon } from '../Icon/Icon';
import cls from './Header.module.css';

interface Props {

  /** Whether logo and sidebar toggle button are visible. */
  isLogoVisible: boolean;

  /** Show sidebar. */
  onSiderbarShow: () => void;
}

/**
 * TODO: Implement header funtionality.
 */
export const Header: VFC<Props> = ({ isLogoVisible, onSiderbarShow }) => (
  <header className={cls.header}>
    {isLogoVisible && (
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={onSiderbarShow}
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
