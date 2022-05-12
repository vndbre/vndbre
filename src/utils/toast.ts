import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

const DEFAULT_MESSAGE_DURATION_IN_MILLISECONDS = 5000;

interface ToastConfig {

  /** Title. */
  readonly title?: string;

  /** Toast position on the screen. */
  readonly position?: 'top' | 'bottom';

  /** Toast duration in milliseconds. */
  readonly duration?: number;
}

export namespace Toast {

  /**
   * Shows message.
   * @param message Message to display.
   * @param status Message status.
   * @param config Config to customize toast.
   */
  export function showMessage(message: string, status: 'success' | 'error', config?: ToastConfig): void {
    toast({
      title: config?.title ?? status.charAt(0).toUpperCase() + status.slice(1),
      description: message,
      status,
      duration: config?.duration ?? DEFAULT_MESSAGE_DURATION_IN_MILLISECONDS,
      isClosable: true,
      position: config?.position ?? 'top',
    });
  }
}
