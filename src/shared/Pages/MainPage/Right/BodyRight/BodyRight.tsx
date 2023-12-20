import React, {useEffect} from 'react';
import styles from './bodyright.scss';
import {EBold, EColor, Text} from "../../../../Text";
import classNames from "classnames";
import {EIcon, Icon} from "../../../../Icon";
import {useStore} from "effector-react";
import {$trackedItem} from "../../../../../store/taskPomodorStore";
import {
  $currentTimer,
  $isActiveTimer,
  $isPauseTimer,
  $timer, addTimerTick,
  doneTimer, finishTimer,
  pauseTimer, resumeTime,
  skipTimer,
  startTimer,
  stopTimer,

} from "../../../../../store/timerStore";
import {$listTaskStore, $todayTasks} from "../../../../../store/listTaskStore";
import {$timersTime, changeTimeForStatics} from "../../../../../store/timerTimeStore";
import {openSettings} from "../../../../../store/actionMenuListStore";


export function BodyRight() {
  const list = useStore($listTaskStore)
  const trackedItem = useStore($trackedItem)
  const timerAll = useStore($timer)
  const timer = useStore($timer).timeForSecond
  const isTimer = useStore($isActiveTimer)
  const isPauseTimer = useStore($isPauseTimer)
  const currentTimer = useStore($currentTimer).name
  const timersTime = useStore($timersTime)
  const todayTasks = useStore($todayTasks)
  const workTimeType = timersTime.workTime.name
  const breakTimeType = timersTime.breakTime.name
  const longBreakTimeType = timersTime.longBreakTime.name

  const btnAddClasses = classNames('btn-reset', styles.btnAdd)
  const btnSettings = classNames('btn-reset', styles.btnSettings)
  const greenBtn = classNames('btn-reset', styles.greenBtn, styles.btnAction)
  const redBtn = classNames('btn-reset', styles.redBtn, styles.btnAction)

  const timerValue = Number(timer)

  console.log(timerAll)
  useEffect(() => {
    if (timerValue < 0) {
      finishTimer() 
    }
  }, [timer])

  const minutes = String(Math.floor( timer / 60)).padStart(2, '0');
  const seconds = String(Math.floor((timer % 60) )).padStart(2, '0');

  const formattedTimer = `${minutes}:${seconds}`

  const numberTasks = todayTasks.items.findIndex((elem) => elem.id === trackedItem?.id)
  const onClickAddTick = () => {
    addTimerTick()
    if (currentTimer === workTimeType) {
      changeTimeForStatics({name: "workTime"})
    } else if (currentTimer === breakTimeType) {
      changeTimeForStatics({name: "breakTime"})
    } else if (currentTimer === longBreakTimeType) {
      changeTimeForStatics({name: "longBreakTime"})
    }
  }

  return (
    <div className={styles.body}>
      <button className={btnSettings}
              onClick={() => {openSettings()}}
      >
        Настройка таймера
      </button>
      <div className={styles.box}>
        <div className={styles.timerWrap}>
          <Text className={styles.timer} As={"div"} size={150} lheight={179} bold={EBold.ultraLight}>
            {formattedTimer}
          </Text>
          <button className={btnAddClasses}
                  onClick={onClickAddTick}
          >
            <Icon name={EIcon.Plus} />
          </button>
        </div>
        <div className={styles.task}>
          {numberTasks !== undefined && trackedItem?.name && (
            <Text lheight={17} color={EColor.gray}>Задача {numberTasks + 1} - </Text>
          )}
          <Text lheight={17}>{trackedItem ? trackedItem.name : " "}</Text>
        </div>
        <div className={styles.actions}>
          {!isTimer &&!isPauseTimer ? (
            <button disabled={list.length < 1} onClick={() => startTimer()} className={greenBtn}>Старт</button>
          ) : isPauseTimer ? (
              <button disabled={list.length < 1} onClick={() => resumeTime()} className={greenBtn}>Продолжить</button>
          ) : (
            <button onClick={() => pauseTimer()} className={greenBtn}>Пауза</button>
          )}

        {isPauseTimer && currentTimer === workTimeType ? (
          <button className={redBtn} onClick={() => doneTimer()}>Сделано</button>
        ) : currentTimer !== workTimeType ? (
          <button className={redBtn} onClick={() => skipTimer()}>Пропустить</button>
        ) : (
          <button disabled={!isTimer} className={redBtn} onClick={() => stopTimer()}>Стоп</button>
        )}
        </div>
      </div>
    </div>
  );
}
