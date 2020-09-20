import React from 'react';
import { Button, Select, Input, Switch, Card } from 'antd';
import { RootState } from '@/types';
import { Dispatch, connect } from 'dva';

type VideoAttrProps = {
  sourceMode: 'Category' | 'Static';
  data: string;
  cId: string;
  loop: boolean;
  size: 'none' | 'cover' | 'contain';
  showLib: () => void;
  handleChange: (v: any) => void;
};
const { Option } = Select;

const VideoAttribute: React.FC<VideoAttrProps> = props => {
  const { showLib, handleChange, size, sourceMode, data } = props;
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
      <Select
        onChange={v => handleChange({ target: { name: 'size', value: v } })}
        size="small"
        value={size}
        style={{ width: '100%', marginTop: '6px' }}
      >
        <Option value="none">无</Option>
        <Option value="contain">Contain</Option>
        <Option value="cover">Cover</Option>
        {/* <Option value="fill">Fill</Option> */}
      </Select>
      <Input
        onChange={handleChange}
        name="data"
        addonBefore="地址"
        size="small"
        value={data}
        style={{ marginTop: '6px' }}
      />
      <div style={{ marginTop: '6px' }}>
        <span>循环播放</span>
        <Switch
          onChange={checked =>
            handleChange({ target: { value: checked, name: 'loop' } })
          }
          checkedChildren="是"
          unCheckedChildren="否"
        />
      </div>
      <Button type="link" onClick={showLib}>
        从素材库选择
      </Button>
    </Card>
  );
};
const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: VideoAttrProps) => {
  const { cId, size, sourceMode, data } = ownProps;
  return {
    showLib: () =>
      dispatch({
        type: 'material/setVisible',
        payload: {
          visible: true,
          replaceType: 1,
          type: 2,
        },
      }),
    handleChange: (e: any) =>
      dispatch({
        type: 'webPage/updateBlock',
        payload: {
          cId,
          attribute: {
            sourceMode,
            data,
            size,
            [e.target.name]: e.target.value,
          },
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoAttribute);
