import React, {useEffect, useRef, useState} from 'react';
import styles from './taskitem.scss';
import classNames from "classnames";
import {EBold, Text} from "../../../../../Text";
import {ActionMenu} from "./ActionMenu";
import {useStore} from "effector-react";
import {
    $inputTempTask,
    $isEditingTask,
    isFalseEditingTask,
    updateInputTempTask, updateItemNameTask
} from "../../../../../../store/listTaskStore";
import {useClickOutsideInput} from "../../../../../hooks/useClickOutsideInput";


interface ITaskItem {
    name: string;
    pomodoro_count: number;
    id: number;
}

export function TaskItem({name, pomodoro_count, id}: ITaskItem) {
  const isEdit = useStore($isEditingTask)[id]
  const inputValue = useStore($inputTempTask)[id] || name
  const [show, setShow] = useState(false)
  const ref = useClickOutsideInput({onClose, isEdit})

  function onClose() {
      isFalseEditingTask(id)
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateInputTempTask({id, value: event.target.value})
  }

  useEffect(() => {
      setShow(true)
  }, [])

  function onSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
        updateItemNameTask({id, newName: inputValue})
        onClose()
    }
  }

  const liClasses = classNames(styles.item, {[styles.show]: show})
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
