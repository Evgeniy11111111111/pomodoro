import React from 'react';
import styles from './headright.scss';
import {EBold, EColor, Text} from "../../../../Text";
import {useStore} from "effector-react";
import {$trackedItem} from "../../../../../store/taskPomodorStore";
import {$currentTimer, $isActiveTimer} from "../../../../../store/timerStore";
import classNames from "classnames";
import {$timersTime} from "../../../../../store/timerTimeStore";

export function HeadRight() {
  const isTimer = useStore($isActiveTimer);
  const currentTimer = useStore($currentTimer).name
  const trackedItem = useStore($trackedItem)
  const workTimerType = useStore($timersTime).workTime.name

  const headClasses = classNames(styles.head, {[styles.timer]: isTimer && currentTimer === workTimerType, [styles.pause]: currentTimer !== workTimerType && isTimer})

  return (
    <div className={headClasses}>
      <Text bold={EBold.bold} lheight={17} color={EColor.white} className={styles.name}>
          {trackedItem !== null ? trackedItem.name : 'Нет задания'}
      </Text>
      <Text color={EColor.white} className={styles.pomodoro}>Помидор {trackedItem?.pomodoro_current}</Text>
    </div>
  );
}
