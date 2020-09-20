import React from 'react';
import { Card, Input, Radio } from 'antd';
import { connect, Dispatch } from 'dva';
import ColorPicker from '@/components/ColorPicker';
import { ColorChangeHandler } from 'react-color';
import { TextAlign } from '@/types';

type CatBlockAttrs = {
  catIndex: number;
  isDefault: boolean;
  showText: boolean;
  textAlign: TextAlign;
  fontSize: number;
  fontColor: number;
};
type CatBlockProps = CatBlockAttrs & {
  cId: string;
  dispatch: Dispatch;
};
const alignment = ['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR'];
const CatBlockAttributes = (props: CatBlockProps) => {
  const {
    catIndex,
    fontColor,
    fontSize,
    isDefault,
    showText,
    cId,
    textAlign,
    dispatch,
  } = props;

  const handleChange = (e: any) => {
    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        cId,
        attribute: {
          fontSize,
          fontColor,
          isDefault,
          showText,
          catIndex,
          [e.target.name]: e.target.value,
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
      <Input
        name="catIndex"
        addonBefore="栏目序号"
        size="small"
        onChange={handleChange}
        value={catIndex}
        style={{marginTop:'6px'}}
      />
      <Radio.Group name="isDefault" onChange={handleChange} value={isDefault}
        style={{marginTop:'6px'}}>
        <Radio value={true}>默认选中</Radio>
        <Radio value={false}>不选中</Radio>
      </Radio.Group>
      <Radio.Group name="showText" onChange={handleChange} value={showText}
      style={{marginTop:'6px'}}>
        <Radio value={true}>显示文字</Radio>
        <Radio value={false}>不显示文字</Radio>
      </Radio.Group>
      <Radio.Group style={{marginTop:'6px'}}
        name="textAlign"
        size="small"
        onChange={handleChange}
        value={textAlign}
      >
        {alignment.map(i => {
          return (
            <Radio.Button key={i} value={i}>
              {i}
            </Radio.Button>
          );
        })}
      </Radio.Group>
      <Input
        onChange={handleChange}
        addonBefore="字体大小"
        name="fontSize"
        size="small"
        defaultValue={16}
        value={fontSize}
        style={{marginTop:'6px'}}
      />
      <Input
        name="fontColor"
        onChange={handleChange}
        addonBefore="字体颜色"
        value={fontColor}
        size="small"
        type="color"
        style={{marginTop:'6px'}}
      />
    </Card>
  );
};

export default React.memo(connect()(CatBlockAttributes));
