import React from 'react';
import styles from './EpgColumn.less';

export const EpgColumn: React.FC = () => {
  return (
    <ul className={styles['category-list']}>
      <li className={styles['category-list-item']}>
        <span>导航栏目</span>
      </li>
      <li className={styles['category-list-item']}>
        <span>导航栏目</span>
      </li>
      <li className={styles['category-list-item']}>
        <span>导航栏目</span>
      </li>
    </ul>
  );
};
