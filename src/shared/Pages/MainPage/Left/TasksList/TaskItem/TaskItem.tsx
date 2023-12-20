import React, {useEffect} from 'react';
import styles from './taskitem.scss';
import classNames from "classnames";
import {EBold, Text} from "../../../../../Text";
import {ActionMenu} from "./ActionMenu";
import {useStore} from "effector-react";
import {
    $inputTempTask, $isAnimatedTask,
    $isEditingTask,
    isFalseEditingTask, isTrueAnimatedTask,
    updateInputTempTask, updateItemNameTask
} from "../../../../../../store/listTaskStore";
import {useClickOutsideInput} from "../../../../../hooks/useClickOutsideInput";

interface ITaskItem {
    name: string;
    pomodoro_count: number;
    id: number;
}

export function TaskItem({name, pomodoro_count, id}: ITaskItem) {
  const isAnimated = useStore($isAnimatedTask)[id]
  const isEdit = useStore($isEditingTask)[id]
  const inputValue = useStore($inputTempTask)[id] || name
  const ref = useClickOutsideInput({onClose, isEdit})

  useEffect(() => {
      isTrueAnimatedTask(id)
  }, [])

  function onClose() {
      isFalseEditingTask(id)
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateInputTempTask({id, value: event.target.value})
  }

  function onSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
        updateItemNameTask({id, newName: inputValue})
        onClose()
    }
  }

  const liClasses = classNames(styles.item, {
      [styles.show]: isAnimated
  })
  const inputClasses = classNames('input-reset', styles.input)
  return (
      <li className={liClasses}>
        <div className={styles.left}>
          <div className={styles.pomodoroAmount}>
            <Text className={styles.pomodoroCount} lheight={17} bold={EBold.light}>{pomodoro_count}</Text>
          </div>
          <Text lheight={17} bold={EBold.light}>{name}</Text>
          {isEdit && (
              <input ref={ref}
                     value={inputValue}
                     className={inputClasses}
                     onChange={onChange}
                     onKeyDown={onSubmit}
              />
          )}
        </div>
        <div className={styles.right}>
          <ActionMenu id={id}/>
        </div>
      </li>
  );
}
