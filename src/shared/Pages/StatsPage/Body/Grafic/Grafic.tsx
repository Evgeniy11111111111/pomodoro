import React from 'react';
import styles from './grafic.scss';
import classNames from "classnames";
import {EColor, Text} from "../../../../Text";
import {useStore} from "effector-react";
import {
    $selectedDay,
    $selectedWeekly,
    changeSelectDay,
    daysArr,
    IDaysForWeek
} from "../../../../../store/donePomodoroStore";
import {heightDetection} from "../../../../../utils/otherFunction/heightDetection";


export function Grafic() {
  const selected = useStore($selectedWeekly)
  const selectedDay = useStore($selectedDay)
  const daysList = classNames("list-reset", styles.list)
  const markingList = classNames("list-reset", styles.marking)

  const week = daysArr.map(item => {
      const updatedItem = {...item}
      if (selected !== null) {
          selected.daysCompleted.forEach(elem => {
              if (elem.dayOfWeek === item.dayOfWeek) {
                  updatedItem.workTime = elem.completedWorkTime
              }
          })

      }
      return updatedItem
  })

  const onClick = (item: IDaysForWeek) => {
      changeSelectDay(item.dayOfWeek)
  }
  console.log(selectedDay)
  return (
    <div className={styles.grafic}>
      <div className={styles.top}>
          <ul className={markingList}>
              <li className={styles.markingItem}>
                  <div className={styles.band}></div>
                  <Text As={"div"}
                        size={12}
                        lheight={33}
                        color={EColor.totalBlack}
                        className={styles.time}
                  >
                      1 ч 40 мин
                  </Text>
              </li>
              <li className={styles.markingItem}>
                  <div className={styles.band}></div>
                  <Text As={"div"}
                        size={12}
                        lheight={33}
                        color={EColor.totalBlack}
                        className={styles.time}
                  >
                      1 ч 15 мин
                  </Text>
              </li>
              <li className={styles.markingItem}>
                  <div className={styles.band}></div>
                  <Text As={"div"}
                        size={12}
                        lheight={33}
                        color={EColor.totalBlack}
                        className={styles.time}
                  >
                      50 мин
                  </Text>
              </li>
             <li className={styles.markingItem}>
                 <div className={styles.band}></div>
                 <Text As={"div"}
                       size={12}
                       lheight={33}
                       color={EColor.totalBlack}
                       className={styles.time}
                 >
                    25 мин
                 </Text>
             </li>
          </ul>
      </div>
      <div className={styles.bottom}></div>
      <div className={styles.days}>
          <ul className={daysList}>
            {week.map((item) => (
                <li key={item.id} onClick={() => {onClick(item)}} className={classNames(styles.item, {
                    [styles.workSelected]: selectedDay && selectedDay.dayOfWeek === item.dayOfWeek
                })}>
                    <div
                         style={{height: heightDetection(item.workTime)}}
                         className={classNames(styles.progress, {
                             [styles.work]: item.workTime > 0,
                         })}
                    ></div>
                    <Text As={"div"}
                          size={24}
                          lheight={24}
                          color={EColor.gray}
                          className={classNames(styles.name)}
                    >
                        {item.abbr}
                    </Text>
                </li>
            ))}
          </ul>
      </div>
    </div>
  );
}
