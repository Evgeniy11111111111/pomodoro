import React from 'react';
import styles from './mainpage.scss';
import {Left} from "./Left";
import {Right} from "./Right";

export function MainPage() {
  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.content}>
          <Left />
          <Right />
        </div>
      </div>
    </div>
  );
}
