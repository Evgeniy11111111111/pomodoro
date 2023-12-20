import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './settingsmodal.scss';
import {useCloseDropdown} from "../../../hooks/useCloseDropdown";
import {closeModal} from "../../../../store/actionMenuListStore";
import classNames from "classnames";
import {EIcon, Icon} from "../../../Icon";
import {EColor, Text} from "../../../Text";
import {useStore} from "effector-react";
import {
    $timersTime, changeInputsTimersTime, changeTimeInputs, changeValueInputs,
} from "../../../../store/timerTimeStore";
import {calculateTotalTime, changeItemsTime} from "../../../../store/listTaskStore";


export function SettingsModal() {
  const inputsTimer = useStore($timersTime)
  const inputClasses = classNames("input-reset", styles.input)
  const closeClasses = classNames("btn-reset", styles.close)
  const submitClasses = classNames('btn-reset', styles.submit)
  const onClose = () => {
      changeValueInputs()
      closeModal()
  }

  const onSubmit = (e: FormEvent) => {
      e.preventDefault()
      changeTimeInputs()
      changeItemsTime()
      closeModal()
  }

  const handleInputChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      changeInputsTimersTime({name, value})
  }


  const ref = useCloseDropdown({onClose})
  return (
    <div ref={ref} className={styles.content}>
      <button onClick={onClose} className={closeClasses}>
          <Icon name={EIcon.Close} />
      </button>
      <form onSubmit={onSubmit} className={styles.form}>

          <div className={styles.inputWrap}>
              <label className={styles.label}>Продолжительность перерыва</label>
              <input className={inputClasses}
                     type="number"
                     min={0}
                     name={inputsTimer["workTime"].name}
                     value={inputsTimer["workTime"].value}
                     onChange={(e) => handleInputChange("workTime", e)}
              />
          </div>

          <div className={styles.inputWrap}>
              <label className={styles.label}>Продолжительность перерыва</label>
              <input className={inputClasses}
                     type="number"
                     min={0}
                     name={inputsTimer["breakTime"].name}
                     value={inputsTimer["breakTime"].value}
                     onChange={(e) => handleInputChange("breakTime", e)}
              />
          </div>

          <div className={styles.inputWrap}>
              <label className={styles.label}>Продолжительность перерыва</label>
              <input className={inputClasses}
                     type="number"
                     min={0}
                     name={inputsTimer["longBreakTime"].name}
                     value={inputsTimer["longBreakTime"].value}
                     onChange={(e) => handleInputChange("longBreakTime", e)}
              />
          </div>

          <div className={styles.inputWrap}>
              <label className={styles.label}>Продолжительность перерыва</label>
              <input className={inputClasses}
                     type="number"
                     min={0}
                     name={inputsTimer["countWork"].name}
                     value={inputsTimer["countWork"].value}
                     onChange={(e) => handleInputChange("countWork", e)}
              />
          </div>

          <button type="submit" className={submitClasses}>
              <Text color={EColor.white}>ОК</Text>
          </button>
      </form>
    </div>
  );
}
