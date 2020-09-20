import React from 'react';
import styles from './EpgImage.less';

export const EpgImage = (props: any) => {
  const { url } = props;
  return <img className={styles.img} src={url} draggable="false" />;
};
