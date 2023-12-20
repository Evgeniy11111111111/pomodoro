import React, {useEffect} from 'react';
import styles from './mainpage.scss';
import {Left} from "./Left";
import {Right} from "./Right";
import {$todayTasks, initTodayTasks} from "../../../store/listTaskStore";
import {useStore} from "effector-react";

export function MainPage() {
  const use = useStore($todayTasks)
  useEffect(() => {
      initTodayTasks()
  }, [])

  console.log(use)
  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.content}>
          <Left />
          <Right />
        </div>
      </div>
    </div>
  );
}
