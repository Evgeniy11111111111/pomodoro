import React from 'react';
import styles from './modal.scss';
import ReactDOM from "react-dom";

interface IModal {
  children: React.ReactNode;
}
export function Modal({children}: IModal) {
  const node = document.querySelector('#modal_root')

  if (!node) return null
  return ReactDOM.createPortal((
    <div className={styles.modal}>
      <div className={styles.dialog}>
          <div className={styles.content}>
            {children}
          </div>
      </div>
    </div>
  ), node);
}
