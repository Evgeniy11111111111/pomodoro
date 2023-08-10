import React from 'react';
import styles from './right.scss';
import {HeadRight} from "./HeadRight";
import {BodyRight} from "./BodyRight";

export function Right() {

  return (
    <div className={styles.right}>
      <HeadRight />
      <BodyRight />
    </div>
  );
}
