import React from 'react';
import styles from './statslink.scss';
import {Link} from "react-router-dom";
import {EIcon, Icon} from "../../Icon";
import {EColor, Text} from "../../Text";

export function StatsLink() {
  return (
    <Link className={styles.link} to="/stats">
      <span className={styles.icon}>
        <Icon name={EIcon.Equalizer} />
      </span>
      <Text className={styles.text} lheight={17} color={EColor.red} >
        Статистика
      </Text>
    </Link>
  );
}
