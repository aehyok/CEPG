import React from 'react';
import { Input, Select, Card } from 'antd';
import { connect, Dispatch } from 'dva';

type DateTimeBlockAttrProps = {
    cId:string;
    sourceMode: 'Category' | 'Static' | 'DeviceSet';
    data: string;
    dispatch: Dispatch;
  };

const { Option } = Select;

const DateTimeBlockAttributes:React.FC<DateTimeBlockAttrProps>= props => {
    const { sourceMode,data,cId,dispatch } = props;

    const handleChange = (e: any) => {
        dispatch({
          type: 'webPage/updateBlock',
          payload: {
            cId,
            attribute: {
              sourceMode,
              data,
              [e.target.name]: e.target.value,
            },
          },
        });
      };

    return (
        <Card title="属性" bordered={false} size="small" style={{ marginTop: 10 }}>
         <Select size="small" value={sourceMode} style={{ width: 100 }} allowClear>
        <Option value="Category">栏目</Option>
        <Option value="Static">静态</Option>
        <Option value="DeviceSet">设备设置</Option>
      </Select>
      <Input
        name="data"
        addonBefore="数据"
        size="small"
        onChange={handleChange}
        value={data}
        style={{marginTop:'6px'}}
      />
    </Card>
    );
};

export default React.memo(connect()(DateTimeBlockAttributes));
