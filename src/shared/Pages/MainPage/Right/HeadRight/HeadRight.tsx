import React from 'react';
import styles from './headright.scss';
import {EBold, EColor, Text} from "../../../../Text";
import {useStore} from "effector-react";
import {$trackedItem} from "../../../../../store/taskPomodorStore";

export function HeadRight() {
  const trackedItem = useStore($trackedItem)

  console.log(trackedItem)
  return (
    <div className={styles.head}>
      <Text bold={EBold.bold} lheight={17} color={EColor.white} className={styles.name}>
          {trackedItem !== null ? trackedItem.name : 'Нет задания'}
      </Text>
      <Text color={EColor.white} className={styles.pomodoro}>Помидор {trackedItem?.pomodoro_current}</Text>
    </div>
  );
}
