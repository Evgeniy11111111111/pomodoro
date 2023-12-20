import React from 'react';
import styles from './header.scss';
import {LogoLink} from "./LogoLink";
import {StatsLink} from "./StatsLink";
import {SwitchBtn} from "./SwitchBtn";

export function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <LogoLink />
          <div className={styles.right}>
            <SwitchBtn className={styles.switch}/>
            <StatsLink />
          </div>
        </div>
      </div>
    </header>
  );
}
