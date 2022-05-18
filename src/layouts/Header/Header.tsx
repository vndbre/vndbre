import React, { memo, VFC } from 'react';
import { Box, Fade, Heading, HStack, IconButton, Popover, PopoverContent, PopoverTrigger, Tooltip, useDisclosure } from '@chakra-ui/react';
import { Icon } from '../../components/Icon/Icon';
import { ViewSettingsForm } from '../../components/ViewSettingsForm/ViewSettingsForm';

interface Props {

  /** Whether logo and sidebar toggle button are visible. */
  readonly isLogoVisible: boolean;

  /** Callback to run when the sidebar should show up. */
  readonly onSidebarShow: () => void;
}

/**
 * App header.
 */
export const HeaderComponent: VFC<Props> = ({ isLogoVisible, onSidebarShow }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

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
                  icon={<Icon name="carbon:view" size={32} />}
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
      </Box>
    </Box>
  );
};

export const Header = memo(HeaderComponent);
