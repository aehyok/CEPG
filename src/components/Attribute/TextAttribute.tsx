import React, { ChangeEventHandler } from 'react';
import { Card, Input, Select } from 'antd';
import { connect, Dispatch } from 'dva';
import ColorPicker from '@/components/ColorPicker';
import { ColorChangeHandler } from 'react-color';
import { TextAlign } from '@/types';

const { Option } = Select;

export type TextAttributeType = {
  fontSize: number;
  fontColor: string;
  backgroundColor:string; 
  textAlign: TextAlign;
  sourceMode: 'Category' | 'Static';
  data: string;
};
export type TextAttributeProps = TextAttributeType & {
  cId: string;
  dispatch: Dispatch;
};
const TextAttribute = (props: TextAttributeProps) => {
  const { dispatch, fontSize, fontColor, sourceMode, data,backgroundColor, cId } = props;

  const handleChange = (e: any) => {
    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        cId,
        attribute: {
          sourceMode,
          data,
          fontSize,
          fontColor,
          backgroundColor,        
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleComplete: ColorChangeHandler = color => {
    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        cId,
        attribute: {
          data,
          sourceMode,
          fontSize,
          fontColor,
          backgroundColor:color.hex        
        },
      },
    });
  };

  return (
    <Card
      title="属性"
      bordered={false}
      size="small"
      style={{ marginTop: '6px' }}
    >
      <Select
        onChange={v =>
          handleChange({ target: { name: 'sourceMode', value: v } })
        }
        size="small"
        value={sourceMode}
        allowClear
        style={{ width: '100%', marginTop: '6px' }}
      >
        <Option value="Category">栏目</Option>
        <Option value="Static">自定义</Option>
      </Select>
      <Input
        onChange={handleChange}
        name="data"
        addonBefore="文本"
        size="small"
        value={data}
        style={{ marginTop: '6px' }}
      />
      <Input
        onChange={handleChange}
        addonBefore="字体大小"
        name="fontSize"
        size="small"
        defaultValue={16}
        value={fontSize}
        style={{ marginTop: '6px' }}
      />
      <Input
        name="fontColor"
        onChange={handleChange}
        addonBefore="字体颜色"
        value={fontColor}
        size="small"
        type="color"
        style={{ marginTop: '6px' }}
      />
     
       <span>背景:</span>
          <ColorPicker color={backgroundColor}  onChangeComplete={handleComplete} ></ColorPicker>       
    </Card>
  );
};

export default React.memo(connect()(TextAttribute));
