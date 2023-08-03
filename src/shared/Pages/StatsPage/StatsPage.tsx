import React from 'react';
import styles from './statspage.scss';

export function StatsPage() {
  return (
    <div className={styles.stats}>
      <div className="container">
        <div className={styles.content}>
          Статистика
        </div>
      </div>
    </div>
  );
}
