import React from 'react';
import {
  Select,
  Card,
  Collapse,
  Button,
  InputNumber,
  Input,
  Radio,
} from 'antd';
import { connect, Dispatch } from 'dva';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
type StateBlockProps = {
  sourceMode: 'Static' | 'Category' | 'Dynamic';
  data?: { index: number; data: string; type: 'Image' | 'Video' }[];
  size: 'None' | 'Cover' | 'Contain';
  dispatch: Dispatch;
};
const StateBlockAttributes = (props: StateBlockProps) => {
  const { dispatch, sourceMode, data, size } = props;

  const createState = () => {
    let list = data || [];
    list = list.concat({
      data: '',
      index: list.length + 1,
      type: 'Image',
    });

    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        attribute: {
          sourceMode,
          size,
          data: list,
        },
      },
    });
  };
  const deleteState = (index: number) => {
    let list = data || [];
    list = list.filter((l, idx) => idx !== index);
    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        attribute: {
          sourceMode,
          size,
          data: list,
        },
      },
    });
  };
  const updateAttribute = (e: any) => {
    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        attribute: {
          sourceMode,
          size,
          data,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  const modifyState = (index: number, e: any) => {
    let list = data || [];
    const item = data![index];
    const stateItem = { ...item, [e.target.name]: e.target.value };
    list = list.filter((i, idx) => idx !== index);
    list.splice(index, 0, stateItem);

    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        attribute: {
          sourceMode,
          size,
          data: list,
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
      <Radio.Group size="small" onChange={updateAttribute} name="sourceMode">
        <Radio.Button value="Category">栏目</Radio.Button>
        <Radio.Button value="Static">静态</Radio.Button>
        <Radio.Button value="Dynamic">动态</Radio.Button>
      </Radio.Group>

      <Radio.Group
        size="small"
        value={size}
        style={{ width: '100%' }}
        onChange={updateAttribute}
        name="size"
      >
        <Radio.Button value="None">None</Radio.Button>
        <Radio.Button value="Cover">Cover</Radio.Button>
        <Radio.Button value="Contain">Contain</Radio.Button>
      </Radio.Group>
      <Button
        onClick={createState}
        block
        size="small"
        style={{ margin: '10px 0' }}
      >
        添加状态
      </Button>
      {Array.isArray(data) &&
        data.map((d, idx) => {
          return (
            <Card
              key={idx}
              size="small"
              title={`状态${d.index}`}
              extra={
                <DeleteOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => deleteState(idx)}
                />
              }
              bordered={false}
            >
              <div>
                <span>状态序号 </span>
                <InputNumber
                  value={d.index}
                  style={{ width: '70px' }}
                  size="small"
                  onChange={n =>
                    modifyState(idx, { target: { value: n, name: 'index' } })
                  }
                />
              </div>
              <Input
                name="data"
                addonBefore="URL"
                value={d.data}
                size="small"
                onChange={e => modifyState(idx, e)}
              />
              <Radio.Group
                value={d.type}
                name="type"
                size="small"
                onChange={e => modifyState(idx, e)}
              >
                <Radio.Button value="Image">图片</Radio.Button>
                <Radio.Button value="Video">视频</Radio.Button>
              </Radio.Group>
            </Card>
          );
        })}
    </Card>
  );
};

export default connect()(StateBlockAttributes);
