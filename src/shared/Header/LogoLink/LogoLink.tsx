import React from 'react';
import {Link} from "react-router-dom";
import {EIcon, Icon} from "../../Icon";
import {EColor, Text} from "../../Text";
import styles from "./logolink.scss";

export function LogoLink() {
  return (
    <Link className={styles.link} to='/'>
      <span className={styles.logo}>
        <Icon name={EIcon.Pomodoro}></Icon>
      </span>
      <Text className={styles.text} size={24} lheight={24} color={EColor.red} >
          pomodoro_box
      </Text>
    </Link>
  );
}
