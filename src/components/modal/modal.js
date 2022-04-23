import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalsContainer = document.querySelector('#modals');

export const Modal = ({ title, onClose, children }) => {
  useEffect(() => {

    // Обработка нажатия Esc
    const handleEscKeydown = (event) => {
      event.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
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

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
