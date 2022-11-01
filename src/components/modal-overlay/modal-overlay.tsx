import { FC } from 'react';
import styles from './modal-overlay.module.css';

type IModalOverlayProps = {
  onClick: () => void;
};

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={onClick}></div>
  )
}
