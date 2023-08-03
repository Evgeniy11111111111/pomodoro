import React, {useEffect, useState} from 'react';
import styles from './taskitem.scss';
import classNames from "classnames";
import {EBold, Text} from "../../../../../Text";
import {ActionMenu} from "./ActionMenu";


interface ITaskItem {
    name: string;
    pomodoro_count: number;
    id: number;
}

export function TaskItem({name, pomodoro_count, id}: ITaskItem) {
  const [show, setShow] = useState(false)
  useEffect(() => {
      setShow(true)
  }, [])
  const liClasses = classNames(styles.item, {[styles.show]: show})
  return (
      <li className={liClasses}>
        <div className={styles.left}>
        <div className={styles.pomodoroAmount}>
          <Text className={styles.pomodoroCount} lheight={17} bold={EBold.light}>{pomodoro_count}</Text>
        </div>
        <Text lheight={17} bold={EBold.light}>{name}</Text>
      </div>
        <div className={styles.right}>
          <ActionMenu id={id}/>
        </div>
      </li>
  );
}
