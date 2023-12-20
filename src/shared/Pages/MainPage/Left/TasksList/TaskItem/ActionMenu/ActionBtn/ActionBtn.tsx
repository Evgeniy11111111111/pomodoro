import React from 'react';
import styles from './actionbtn.scss';
import {EIcon, Icon} from "../../../../../../../Icon";
import {EBold, EColor, Text} from "../../../../../../../Text";
import classNames from "classnames";

interface IActionBtn {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: EIcon;
  disabled?: boolean
}
export function ActionBtn({text, disabled,onClick, icon}: IActionBtn) {
  const btnClasses = classNames("btn-reset", styles.btn)

  return (
        <button onClick={onClick} disabled={disabled} className={btnClasses}>
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
          <Text color={EColor.gray} lheight={17} bold={EBold.light} className={styles.text}>{text}</Text>
        </button>

  );
}
