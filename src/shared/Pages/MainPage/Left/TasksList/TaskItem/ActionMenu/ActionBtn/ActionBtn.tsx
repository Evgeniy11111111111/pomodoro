import React from 'react';
import styles from './actionbtn.scss';
import {EIcon, Icon} from "../../../../../../../Icon";
import {EBold, EColor, Text} from "../../../../../../../Text";
import classNames from "classnames";

interface IActionBtn {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: EIcon;
}
export function ActionBtn({text, onClick, icon}: IActionBtn) {
  const btnClasses = classNames("btn-reset", styles.btn)

  return (
        <button onClick={onClick} className={btnClasses}>
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
          <Text color={EColor.gray} lheight={17} bold={EBold.light} className={styles.text}>{text}</Text>
        </button>

  );
}
