import React, {useEffect} from 'react';
import styles from './statspage.scss';
import {Head} from "./Head";
import {$weeklyPomodoros, updateWeekly} from "../../../store/donePomodoroStore";
import {useStore} from "effector-react";
import {Body} from "./Body";

export function StatsPage() {
  const list = useStore($weeklyPomodoros)

  useEffect(() => {
      updateWeekly()
  }, [])

  return (
    <div className={styles.stats}>
      <div className="container">
        <div className={styles.content}>
          <Head />
          <Body />
        </div>
      </div>
    </div>
  );
}
