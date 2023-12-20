import React, {useRef, useState} from 'react';
import styles from './head.scss';
import {EBold, EColor, Text} from "../../../Text";
import {useStore} from "effector-react";
import {$selectedWeekly, $weeklyLatest, $weeklyPomodoros} from "../../../../store/donePomodoroStore";
import {EIcon, Icon} from "../../../Icon";
import classNames from "classnames";
import {HeadDropdown} from "./HeadDropdown";

export function Head() {
  const [isDropdown, setIsDropdown] = useState(false)
  const list = useStore($weeklyPomodoros)
  const listLatest = useStore($weeklyLatest)
  const selected = useStore($selectedWeekly)
  const btnClasses = classNames("btn-reset", styles.btn, {
    [styles.active]: isDropdown
  })
  const buttonRef = useRef(null)
  const onClick = () => {
      setIsDropdown(!isDropdown)
  }
  const onClose = () => {
      setIsDropdown(false)
  }
  console.log(list)
  const items = listLatest !== null && listLatest.filter((item) => item !== selected)
  return (
    <div className={styles.head}>
      <Text
          As={"h2"}
          size={24}
          lheight={33}
          bold={EBold.bold}
      >Ваша активность</Text>
      <div className={styles.dropdow}>
        <button ref={buttonRef}
                onClick={onClick}
                disabled={list.length < 1}
                className={btnClasses}
        >
          <Text size={16} lheight={17} color={EColor.totalBlack}>
            {selected ? selected.value : "Пусто"}
          </Text>
          {items && items.length > 0 && (
            <span className={styles.arrow}>
              <Icon name={EIcon.ArrowRed}/>
            </span>
          )}
        </button>
        {
             items && items.length > 0 && isDropdown && (
                <HeadDropdown buttonRef={buttonRef}
                              items={items}
                              onClose={onClose} />
            )
        }
      </div>
    </div>
  );
}
