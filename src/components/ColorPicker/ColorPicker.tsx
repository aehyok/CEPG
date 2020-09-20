import React, { useState, useRef, createRef } from 'react';
import styles from './ColorPicker.less';
import { SketchPicker, SketchPickerProps } from 'react-color';
import useOutsideClick from '@/hooks/useOutsideClick';

type ColorPickerProps = SketchPickerProps & {
  color: string;
};
const ColorPicker = (props: ColorPickerProps) => {
  const [displayPicker, setDisplayPicker] = useState(false);
  const ref = createRef<HTMLDivElement>();
  useOutsideClick(ref, () => setDisplayPicker(false));
  const { color } = props;

  return (
    <div>
      <div className={styles.swatch} onClick={() => setDisplayPicker(true)}>
        <div className={styles.color} style={{ backgroundColor: color }}></div>
      </div>
      {displayPicker ? (
        <div ref={ref} style={{ position: 'absolute', zIndex: 2 }}>
          <SketchPicker {...props} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
