import React from 'react';
import styles from './bodyright.scss';
import {EBold, EColor, Text} from "../../../../Text";
import classNames from "classnames";
import {EIcon, Icon} from "../../../../Icon";

export function BodyRight() {
  const btnAddClasses = classNames('btn-reset', styles.btnAdd)
  const greenBtn = classNames('btn-reset', styles.greenBtn, styles.btnAction)
  const redBtn = classNames('btn-reset', styles.redBtn, styles.btnAction)

  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <div className={styles.timerWrap}>
          <Text className={styles.timer} As={"div"} size={150} lheight={179} bold={EBold.ultraLight}>25:00</Text>
          <button className={btnAddClasses}>
            <Icon name={EIcon.Plus} />
          </button>
        </div>
        <div className={styles.task}>
            <Text lheight={17} color={EColor.gray}>Задача 1 - </Text>
            <Text lheight={17}>Сверстать сайт</Text>
        </div>
        <div className={styles.actions}>
          <button className={greenBtn}>Старт</button>
          <button className={redBtn}>Стоп</button>
        </div>
      </div>
    </div>
  );
}
