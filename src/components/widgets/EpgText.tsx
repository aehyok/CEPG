import React from 'react';
import styles from './EpgText.less';
import { TextAttributeType } from '../Attribute/TextAttribute';

export type TextProps = {
  data: string;
  fontColor: string;
  fontSize: number;
  backColor: string;
};

const Text = (props: TextAttributeType) => {
  const { data, fontColor, fontSize,backgroundColor } = props;
  return (
    <div className={styles['widget-text']}>
      <div
        className={styles['widget-text-item']}
        style={{
          fontSize: `${fontSize}px`,
          color: fontColor,
          background: backgroundColor,
          
        }}
      >
        {data}
      </div>
    </div>
  );
};

export default Text;
