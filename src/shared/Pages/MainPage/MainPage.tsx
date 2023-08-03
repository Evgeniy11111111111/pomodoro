import React from 'react';
import styles from './mainpage.scss';
import {Left} from "./Left";

export function MainPage() {
  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.content}>
          <Left />
        </div>
      </div>
    </div>
  );
}
