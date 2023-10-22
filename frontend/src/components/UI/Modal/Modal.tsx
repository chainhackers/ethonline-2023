import React from 'react';
import Portal from './Portal';
import { ModalLayout } from './ModalLayout/ModalLayout';
import { useModalIsMounted } from '../../../utils/useModalIsMounted';
import { IModal } from '../../../types/types';

export const Modal = (props: IModal) => {
  const { isOpen, onClose, children } = props;
  const { isMounted } = useModalIsMounted(isOpen);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {children}
      </ModalLayout>
    </Portal>
  );
};
