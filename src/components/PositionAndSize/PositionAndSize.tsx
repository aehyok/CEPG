import React from 'react';
import { InputNumber } from 'antd';
import styles from './index.less';

type PositionAndSizeProps = {
  locateX: number;
  locateY: number;
  locateZ: number;
  width: number;
  height: number;
  screenWidth: number;
  screenHeight: number;
  onRectChange: (n: number | undefined, field: string) => void;
};

const PositionAndSize = (props: PositionAndSizeProps) => {
  const {
    locateX,
    locateY,
    locateZ,
    width,
    height,
    screenHeight,
    screenWidth,
    onRectChange,
  } = props;
  const handleChange = onRectChange || function() {};
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <span style={{display:'inline-block',width:'35px'}}>X </span>
          <InputNumber
            value={locateX}
            style={{ width: '70px' }}
            max={screenWidth - width}
            onChange={n => handleChange(n, 'locateX')}
            name="axis-x"
            size="small"
          />
        </div>
        <div>
          <span style={{display:'inline-block',width:'35px',marginLeft:'6px'}}>Y </span>
          <InputNumber
            value={locateY}
            max={screenHeight - height}
            onChange={n => handleChange(n, 'locateY')}
            style={{ width: '70px' }}
            name="locateY"
            size="small"
          />
        </div>
        <div>
          <span style={{display:'inline-block',width:'35px'}}>Z </span>
          <InputNumber
            value={locateZ}
            onChange={n => handleChange(n, 'locateZ')}
            style={{ width: '70px' }}
            name="locateZ"
            size="small"
            
          />
        </div>
      </div>
      <div>
        <label htmlFor="width">
          <span style={{display:'inline-block',width:'35px'}} >宽度 </span>
          <InputNumber
            onChange={n => handleChange(n, 'width')}
            style={{ width: '70px' }}
            value={width}
            name="width"
            size="small"
          />
        </label>
        <label htmlFor="height">
          <span style={{display:'inline-block',width:'35px',marginLeft:'6px'}} >高度 </span>
          <InputNumber
            style={{ width: '70px' }}
            onChange={n => handleChange(n, 'height')}
            value={height}
            name="height"
            size="small"
          />
        </label>
      </div>
    </>
  );
};

export default PositionAndSize;
