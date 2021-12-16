import React, { memo, VFC } from 'react';
import { Modal, ModalContent, ModalOverlay, Image } from '@chakra-ui/react';

interface Props {

  /** Image url. */
  readonly image: string;

  /** Close modal handler. */
  readonly onClose: () => void;

  /** Flag that opens/closes dialog. */
  readonly isOpen: boolean;
}

/** Dialog for previewing images. */
const ImagePreviewDialogComponent: VFC<Props> = ({ image, onClose, isOpen }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
    <ModalOverlay />
    <ModalContent>
      <Image src={image} />
    </ModalContent>
  </Modal>
);

export const ImagePreviewDialog = memo(ImagePreviewDialogComponent);
