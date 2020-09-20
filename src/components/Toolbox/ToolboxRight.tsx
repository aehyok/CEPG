import React, { useState } from 'react';
import { Button, Radio, Modal } from 'antd';

const list = [
  { pluginType: 'CatListH', label: '横版栏目', width: 980, height: 120 },
  { pluginType: 'CatListV', label: '竖版栏目', width: 120, height: 600 },
  { pluginType: 'CatBlock', label: '栏目块', width: 100, height: 100 },
  { pluginType: 'PicsShuffling', label: '图片轮播', width: 500, height: 300 },
  { pluginType: 'AdBlock', label: '广告位', width: 300, height: 250 },
  { pluginType: 'PicList', label: '图片列表', width: 500, height: 300 },
  { pluginType: 'Button', label: '按钮', width: 120, height: 60 },
  { pluginType: 'Text', label: '文本组件', width: 240, height: 60 },
  { pluginType: 'Video', label: '视频组件', width: 300, height: 300 },
  { pluginType: 'Image', label: '图片组件', width: 300, height: 300 },
  { pluginType: 'StateBlock', label: '状态组件', width: 340, height: 300 },
  { pluginType: 'Weather', label: '天气组件', width: 340, height: 300 },
  { pluginType: 'DateTimeBlock', label: '日期时间组件', width: 340, height: 300 },
];
export const ToolboxRight = (props: any) => {
  const { dispatch, currentPage } = props;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const handleChange = (value?: string) => {
    if (!value) return;
    setSelected(value);
  };
  const insertComponent = () => {
    const item = list.find(l => l.pluginType === selected);
    if (item) {
      dispatch({
        type: 'webPage/createBlock',
        payload: {
          pluginType: item.pluginType,
          width: item.width,
          height: item.height,
          name: item.label,
        },
      });
      setVisible(false);
    }
  };
  return (
    <div>
      <Button onClick={() => setVisible(true)}>组件库</Button>
      <Button
        onClick={() =>
          dispatch({
            type: 'material/setVisible',
            payload: { visible: true, replaceType: -1 },
          })
        }
      >
        素材库
      </Button>
      <Modal
        title="组件库"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            取消
          </Button>,
          <Button
            disabled={!selected || !currentPage}
            key="insert"
            type="primary"
            onClick={insertComponent}
          >
            插入组件
          </Button>,
        ]}
      >
        <Radio.Group
          onChange={e => {
            handleChange(e.target.value);
          }}
        >
          {list.map(l => (
            <Radio key={l.pluginType} value={l.pluginType}>
              {l.label}
            </Radio>
          ))}
        </Radio.Group>
      </Modal>
    </div>
  );
};
