import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

const DEFAULT_MESSAGE_DURATION_IN_MILLISECONDS = 5000;

interface ToastConfig {
  title?: string;
  position?: 'top' | 'bottom';
  duration?: number;
}

export namespace Toast {

  /**
   *
   * @param message
   * @param config
   */
  export function showErrorMessage(message: string, config?: ToastConfig): void {
    toast({
      title: config?.title ?? 'Error',
      description: message,
      status: 'error',
      duration: config?.duration ?? DEFAULT_MESSAGE_DURATION_IN_MILLISECONDS,
      isClosable: true,
      position: config?.position ?? 'top',
    });
  }
}
