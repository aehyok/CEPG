import React from 'react';
import { Card, Input, Radio, InputNumber } from 'antd';
import { connect, Dispatch } from 'dva';
// import ColorPicker from '@/components/ColorPicker';
// import { ColorChangeHandler } from 'react-color';

type TextAlign = 'TL' | 'TC' | 'TR' | 'ML' | 'MC' | 'MR' | 'BL' | 'BC' | 'BR';
type CategoryListAttrs = {
  itemWidth: number;
  itemHeight: number;
  itemPadding: number;
  indexMin: number;
  indexMax: number;
  showText: boolean;
  textAlign: TextAlign;
  fontSize: number;
  fontColor: number;
};
type CatBlockProps = CategoryListAttrs & {
  cId: string;
  dispatch: Dispatch;
};
const alignment = ['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR'];
const CatBlockAttributes = (props: CatBlockProps) => {
  const {
    itemWidth,
    itemHeight,
    itemPadding,
    indexMax,
    indexMin,
    fontColor,
    fontSize,
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
          itemWidth,
          itemHeight,
          itemPadding,
          indexMax,
          indexMin,
          fontSize,
          fontColor,
          showText,
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
      style={{ marginTop: '10px' }}
    >
      <div>
        <span>栏目宽度 </span>
        <InputNumber
          value={itemWidth}
          style={{ width: '70px' }}
          name="itemWidth"
          size="small"
          onChange={n =>
            handleChange({ target: { name: 'itemWidth', value: n } })
          }
        />
      </div>
      <div style={{ marginTop: '6px' }}>
        <span>栏目高度 </span>
        <InputNumber
          value={itemHeight}
          onChange={n =>
            handleChange({ target: { name: 'itemHeight', value: n } })
          }
          style={{ width: '70px' }}
          name="itemHeight"
          size="small"
        />
      </div>
      <div style={{ marginTop: '6px' }}>
        <span>栏目间距 </span>
        <InputNumber
          value={itemPadding}
          onChange={n =>
            handleChange({ target: { name: 'itemPadding', value: n } })
          }
          style={{ width: '70px' }}
          name="itemHeight"
          size="small"
        />
      </div>
      <div style={{ marginTop: '6px' }}>
        <span>栏目序号范围 </span>
        <InputNumber
          value={indexMin}
          onChange={n =>
            handleChange({ target: { name: 'indexMin', value: n } })
          }
          style={{ width: '50px' }}
          max={indexMax}
          name="indexMin"
          size="small"
        />
        <span>-</span>
        <InputNumber
          value={indexMax}
          onChange={n =>
            handleChange({ target: { name: 'indexMax', value: n } })
          }
          style={{ width: '50px' }}
          min={indexMin}
          name="indexMax"
          size="small"
        />
      </div>

      <Radio.Group
        name="showText"
        onChange={handleChange}
        value={showText}
        style={{ marginTop: '6px' }}
      >
        <Radio value={true}>显示文字</Radio>
        <Radio value={false}>不显示文字</Radio>
      </Radio.Group>
      <Radio.Group
        style={{ marginTop: '6px' }}
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
    </Card>
  );
};

export default React.memo(connect()(CatBlockAttributes));
