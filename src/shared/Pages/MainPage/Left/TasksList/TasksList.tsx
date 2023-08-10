import React from 'react';
import styles from './taskslist.scss';
import classNames from "classnames";
import {useStore} from "effector-react";
import {$listTaskStore, calculateTotalReducer} from "../../../../../store/listTaskStore";
import {TaskItem} from "./TaskItem";
import {EBold, EColor, Text} from "../../../../Text";
import {formatTime} from "../../../../../utils/otherFunction/formatTime";

export function TasksList() {
  const items = useStore($listTaskStore)
  const listClasses = classNames('list-reset', styles.list)

  const totalTime = calculateTotalReducer(items)
  const formatedTime = formatTime(totalTime)

  return (
    <div className={styles.listWrapp}>
      {items.length > 0 && (
        <>
          <ul className={listClasses}>
            {items.slice()
                  .sort((a, b) => a.priority - b.priority)
                  .map(item => (
                    <TaskItem key={item.id}
                              pomodoro_count={item.pomodoro_count}
                              name={item.name}
                              id={item.id}
                    />
            ))}
          </ul>
          <Text color={EColor.gray} lheight={17} bold={EBold.light} className={styles.totalTime}>{formatedTime}</Text>
        </>
      )}
    </div>

  );

}
