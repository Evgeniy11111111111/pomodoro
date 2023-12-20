import React from 'react';
import styles from './left.scss';
import {useStore} from "effector-react";
import {$selectedDay, IDailyPomodoros, IDaysForWeek} from "../../../../../store/donePomodoroStore";
import {EBold, EColor, Text} from "../../../../Text";
import {
    convertMinutes,
    declension,
    declensionMinutes,
    declensionPomodoro
} from "../../../../../utils/otherFunction/declension";
import {EIcon, Icon} from "../../../../Icon";
import classNames from "classnames";


function isIDaysForWeek(obj: any): obj is IDaysForWeek {
  return obj && typeof obj.dayOfWeek === 'string' && typeof obj.abbr === 'string';
}

function isIDailyPomodoros(obj: any): obj is IDailyPomodoros {
  return obj && typeof obj.dayOfWeek === 'string' && typeof obj.weekNumber === 'number';
}
export function Left() {
  const selectedDay = useStore($selectedDay)
  const minutes = selectedDay && selectedDay as IDailyPomodoros && convertMinutes((selectedDay as IDailyPomodoros).completedWorkTime).remainingMinutes
  const hours = selectedDay && selectedDay as IDailyPomodoros && convertMinutes((selectedDay as IDailyPomodoros).completedWorkTime).hours
  const stringTime = () => {
      if (hours && minutes && hours > 0 && minutes > 0) {
          return `${declension(hours)} ${declensionMinutes(minutes)}`
      } else if (minutes  && minutes > 0) {
          return `${declensionMinutes(minutes)}`
      } else if (hours && hours > 0)  {
          return `${declension(hours)}`
      }
  }
  console.log(minutes, hours)
  return (
    <div className={styles.left}>
      <div className={styles.day}>
        {isIDaysForWeek(selectedDay) ? (
            <div className={styles.info}>
              <Text As={"div"} size={24} color={EColor.totalBlack} lheight={33} bold={EBold.bold}>{(selectedDay as IDaysForWeek).dayOfWeek}</Text>
              <Text As={"p"} size={16} color={EColor.totalBlack} lheight={28}>Нет данных</Text>
            </div>
        ) : isIDailyPomodoros(selectedDay) ? (
            <div className={styles.info}>
              <Text As={"div"} size={24} color={EColor.totalBlack} lheight={33} bold={EBold.bold}>{(selectedDay as IDailyPomodoros).dayOfWeek}</Text>
              <Text As={"p"} size={16} color={EColor.totalBlack} lheight={28}>
                  Вы работали над задачами в течение
                  <Text size={16} color={EColor.red} lheight={28}>
                      {` ${stringTime()}`}
                  </Text>
              </Text>
            </div>

        ) : (
            <Text As={"div"} size={24} color={EColor.totalBlack} lheight={33} bold={EBold.bold}>День не выбран</Text>
        ) }
      </div>
      <div className={classNames(styles.pomodoro, {
          [styles.flex]: !isIDailyPomodoros(selectedDay)
      })}>
          {isIDailyPomodoros(selectedDay) ? (
              <>
                  <div className={styles.top}>
                      <span className={styles.pomodoroSvg}>
                          <Icon name={EIcon.StatsPomodoro}/>
                      </span>
                      <Text size={24}
                            bold={EBold.bold}
                            lheight={33}
                            color={EColor.gray}
                      >{`x ${(selectedDay as IDailyPomodoros).completedPomodoro}`}</Text>
                  </div>
                  <div className={styles.bottom}>
                      <Text As={"div"}
                            size={24}
                            lheight={33}
                            bold={EBold.bold}
                            color={EColor.white}
                      >
                          {declensionPomodoro((selectedDay as IDailyPomodoros).completedPomodoro)}
                      </Text>
                  </div>
              </>
          ) : (
              <div className={styles.pomodoroBig}>
                <Icon name={EIcon.StatsPomodoroBig} />
              </div>
          )}
      </div>
    </div>
  );
}