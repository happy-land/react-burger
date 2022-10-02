import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

interface IModalProps {
  title?: string;
  onClose: () => {};
}

const modalsContainer = document.querySelector('#modals') as HTMLElement;

export const Modal: FC<IModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    // Обработка нажатия Esc
    const handleEscKeydown = (event: KeyboardEvent): void => {
      event.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', (event) => handleEscKeydown(event));

    return () => {
      document.removeEventListener('keydown', (event) => handleEscKeydown(event));
    };
  }, []);

  return createPortal(
    <>
      <div className={`${styles.container} pt-10 pl-10 pr-10 pb-15`}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
          <CloseIcon type='primary' onClick={onClose} />
        </div>

        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};
