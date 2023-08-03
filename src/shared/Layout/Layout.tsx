import React, {ReactNode} from 'react';
import styles from './layout.scss';

interface ILayoutProps {
  children?: ReactNode
}
export function Layout({children}: ILayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}
