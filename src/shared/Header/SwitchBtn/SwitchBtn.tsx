import React, {useLayoutEffect} from 'react';
import styles from './switchbtn.scss';
import classNames from "classnames";
import {Text} from "../../Text";
import {useStore} from "effector-react";
import {$theme, themeChange} from "../../../store/themeStore";

export function SwitchBtn({className}: {className?: string}) {
  const btnClasses = classNames("btn-reset", styles.btn, className)

  const theme = useStore($theme)

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])
  return (
    <button onClick={() => {themeChange()}} className={btnClasses}>
      <Text>{theme}</Text>
    </button>
  );
}
