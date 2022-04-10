import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalsContainer = document.querySelector('#modals');

export const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return createPortal(
    <>
      <div className={`${styles.container} pt-10 pl-10 pr-10 pb-15`}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
          <CloseIcon type='primary' onClick={onOverlayClick}/>
        </div>

        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick}/>
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
}