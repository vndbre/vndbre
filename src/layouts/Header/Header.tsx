import React, { memo, useCallback, VFC } from 'react';
import {
  Box,
  Button,
  Fade,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../../providers';
import { ViewSettingsForm } from '../../components';
import { Icon } from '../../components/Icon/Icon';
import { useLogoutMutation } from '../queries';
import { Toast } from '../../utils/toast';

interface Props {

  /** Whether logo and sidebar toggle button are visible. */
  readonly isLogoVisible: boolean;

  /** Callback to run when the sidebar should show up. */
  readonly onSidebarShow: () => void;
}

const SUCCESSFUL_LOGOUT_MESSAGE = 'You have been successfully logged out!';

/** Header. */
export const HeaderComponent: VFC<Props> = ({ isLogoVisible, onSidebarShow }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { username, isLoggedIn } = useAuthContext();
  const logoutMutation = useLogoutMutation();

  const handleLogoutButtonClick = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess() {
        Toast.showMessage(SUCCESSFUL_LOGOUT_MESSAGE, 'success');
      },
    });
  }, []);

  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="gray.300"
      h={16}
      display="flex"
      justifyContent="center"
    >
      <Box
        maxW="var(--screen-max-width)"
        w="full"
        display="flex"
        flexDir="row"
        alignItems="center"
        gap={4}
        px={8}
      >
        <Fade in={isLogoVisible}>
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
        </Fade>
        <Popover
          placement="bottom-end"
          matchWidth
          gutter={32}
          isOpen={isOpen}
          onClose={onClose}
          isLazy
        >
          <Tooltip label="View settings">
            <Box display="inline" ml="auto">
              <PopoverTrigger>
                <IconButton
                  aria-label="Toggle view settings"
                  icon={<Icon name="carbon:settings-view" size={32} />}
                  onClick={onOpen}
                  colorScheme="gray"
                  variant="ghost"
                />
              </PopoverTrigger>
            </Box>
          </Tooltip>
          <PopoverContent w="max-content" borderRadius="lg">
            <ViewSettingsForm />
          </PopoverContent>
        </Popover>

        {isLoggedIn ? (
          <Button
            variant="ghost"
            colorScheme="gray"
            onClick={handleLogoutButtonClick}
            isLoading={logoutMutation.isLoading}
          >
            Log Out
          </Button>
        ) :
          <Button as={RouterLink} variant="ghost" colorScheme="gray" to="/auth/login">Log In</Button>}
        {username}
      </Box>
    </Box>
  );
};

export const Header = memo(HeaderComponent);
