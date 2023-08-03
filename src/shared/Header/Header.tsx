import React from 'react';
import styles from './header.scss';
import {LogoLink} from "./LogoLink";
import {StatsLink} from "./StatsLink";

export function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <LogoLink />
          <StatsLink />
        </div>
      </div>
    </header>
  );
}
