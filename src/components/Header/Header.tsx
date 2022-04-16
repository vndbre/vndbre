import React, { VFC } from 'react';
import { Box, Heading, HStack, IconButton, useDisclosure } from '@chakra-ui/react';
import { Icon } from '../Icon/Icon';
import { Popover } from '../Popover/Popover';
import { ViewSettingsForm } from '../ViewSettingsForm/ViewSettingsForm';
import cls from './Header.module.css';

interface Props {

  /** Whether logo and sidebar toggle button are visible. */
  readonly isLogoVisible: boolean;

  /** Callback to run when the sidebar should show up. */
  readonly onSidebarShow: () => void;
}

/**
 * TODO: Implement header functionality.
 */
export const Header: VFC<Props> = ({ isLogoVisible, onSidebarShow }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const viewSettingsButton = (
    <IconButton
      aria-label="Toggle sidebar"
      icon={<Icon name="carbon:view" size={32} />}
      onClick={onOpen}
      colorScheme="gray"
      variant="ghost"
    />
  );

  return (
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
      <Popover isOpen={isOpen} onClose={onClose} popoverTrigger={viewSettingsButton}>
        <ViewSettingsForm />
      </Popover>
      <Box className={cls.profile}>
        <Icon name="carbon:user-avatar" size={32} />
        <span>Profile</span>
      </Box>
      <Icon name="carbon:notification" size={32} />
      <Icon name="carbon:add" size={36} />
    </header>
  );
};
