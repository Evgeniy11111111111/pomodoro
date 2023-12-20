import React from 'react';
import styles from './bottom.scss';
import {EBold, EColor, Text} from "../../../../Text";
import {$selectedDay, IDailyPomodoros} from "../../../../../store/donePomodoroStore";
import {useStore} from "effector-react";
import {focusTime} from "../../../../../utils/otherFunction/focusTime";
import {EIcon, Icon} from "../../../../Icon";
import classNames from "classnames";
import {sectionToMinutes} from "../../../../../utils/otherFunction/timeDifference";

function isIDailyPomodoros(obj: any): obj is IDailyPomodoros {
  return obj && typeof obj.dayOfWeek === 'string' && typeof obj.weekNumber === 'number';
}
export function Bottom() {
  const selectedDay = useStore($selectedDay)

  return (
    <div className={styles.bottom}>
      <div className={classNames(styles.item,{
        [styles.focus]: isIDailyPomodoros(selectedDay) && selectedDay.completedWorkTime > 0
      })}>
        <div className={styles.left}>
          <Text className={styles.title}
                size={24}
                lheight={33}
                bold={EBold.bold}
                As={"h2"}
                color={EColor.totalBlack}
          >
            Фокус
          </Text>
          <Text As={"div"} className={styles.text}
                size={64} lheight={64} color={EColor.totalBlack}
          >
            {isIDailyPomodoros(selectedDay) ? (
                focusTime(selectedDay.completedWorkTime, selectedDay.date)+ '%'
              ) : (
              0 + '%'
            )}
          </Text>
        </div>
        <div className={styles.right}>
          <span className={styles.svg}>
            <Icon name={EIcon.Focus} />
          </span>
        </div>
      </div>
      <div className={classNames(styles.item, {
        [styles.pauseTime]: isIDailyPomodoros(selectedDay) && selectedDay.pauseTime > 0
      })}>
        <div className={styles.left}>
          <Text className={styles.title}
                size={24}
                lheight={33}
                bold={EBold.bold}
                As={"h2"}
                color={EColor.totalBlack}
          >
            Время на паузе
          </Text>
          <Text As={"div"} className={styles.text}
                size={64} lheight={64} color={EColor.totalBlack}
          >
            {isIDailyPomodoros(selectedDay) ? (
              sectionToMinutes(selectedDay.pauseTime)
            ) : (
              0
            )}
          </Text>
        </div>
        <div className={styles.right}>
          <span className={styles.svg}>
            <Icon name={EIcon.TimeInPause} />
          </span>
        </div>
      </div>
      <div className={classNames(styles.item, {
        [styles.stoped]: isIDailyPomodoros(selectedDay) && selectedDay.pauseCount > 0
      })}>
        <div className={styles.left}>
          <Text className={styles.title}
                size={24}
                lheight={33}
                bold={EBold.bold}
                As={"h2"}
                color={EColor.totalBlack}
          >
            Остановки
          </Text>
          <Text As={"div"} className={styles.text}
                size={64} lheight={64} color={EColor.totalBlack}
          >
            {isIDailyPomodoros(selectedDay) ? (
                selectedDay.pauseCount
            ) : (
                0
            )}
          </Text>
        </div>
        <div className={styles.right}>
          <span className={styles.svg}>
            <Icon name={EIcon.StopCount} />
          </span>
        </div>
      </div>
    </div>
  );
}
