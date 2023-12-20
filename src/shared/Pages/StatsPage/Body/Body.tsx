import React from 'react';
import styles from './body.scss';
import {Grafic} from "./Grafic";
import {Left} from "./Left";
import {Bottom} from "./Bottom";

export function Body() {
  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
            <Left />
        </div>
        <div className={styles.topRight}>
            <Grafic />
        </div>
      </div>
      <div className={styles.bottom}>
          <Bottom />
      </div>
    </div>
  );
}
