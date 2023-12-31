import React, {ChangeEvent, FormEvent} from 'react';
import styles from './formaddtask.scss';
import classNames from "classnames";
import {EBold, EColor, Text} from "../../../../Text";
import {useStore} from "effector-react";
import {$input, updateInput} from "../../../../../store/inputStore";
import {$listTaskStore, addItemTask} from "../../../../../store/listTaskStore";
import {$timersTime} from "../../../../../store/timerTimeStore";

const buttonClasses = classNames(
    'btn-reset',
    styles.btn
)

const inputClasses = classNames(
    'input-reset',
    styles.input
)
export function FormAddTask() {
  const value = useStore($input)
  const listLength = useStore($listTaskStore)
  const workTime = useStore($timersTime).workTime.time

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
      updateInput(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
      event.preventDefault();
      const newItemTask = {
          id: Date.now(),
          name: value,
          pomodoro_count: 1,
          priority: listLength.length,
          time: workTime,
          isEditing: false,
          pomodoro_current: 1
      }
      addItemTask(newItemTask)
      updateInput('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input className={inputClasses}
             onChange={handleChange}
             value={value}
             placeholder="Название задания"
      />
      <button type={"submit"} className={buttonClasses}>
          <Text lheight={17} color={EColor.white} bold={EBold.medium}>Добавить</Text>
      </button>
    </form>
  );
}
