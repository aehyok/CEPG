import React, { useState, useCallback } from 'react';
import { Modal, Radio, Button } from 'antd';
import ImageResource from '@/components/ImageResource';
import { RootState, ResourceItemType } from '@/types';
import { connect, Dispatch } from 'dva';

const TABPANES = [
  { name: '图片', value: 1 },
  { name: '视频', value: 2 },
  { name: '流媒体', value: 3 },
];
export type MaterialLibProps = {
  insertBlock: Function;
  visible: boolean;
  type: number;
  /**
   * 用于修改替换原有的资源
   */
  replaceType: number;
  epgId: string;
  setVisible: (visible: boolean) => void;
  setType: (type: number) => void;
  replaceResource: (r: ResourceItemType) => void;
};
const MaterialLib = (props: MaterialLibProps) => {
  const {
    visible,
    setVisible,
    insertBlock,
    replaceType,
    replaceResource,
    type,
    setType,
  } = props;
  const [resource, setResource] = useState<ResourceItemType>();
  const buttonText = type === replaceType ? '替换' : '插入';

  const handleResourceSelect = useCallback((resource: ResourceItemType) => {
    setResource(resource);
  }, []);

  const handleOk = () => {
    if (type === replaceType) {
      resource && replaceResource(resource);
    } else {
      insertBlock(resource);
    }
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      width="60%"
      okText="插入"
      okButtonProps={{ disabled: !resource }}
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          取消
        </Button>,
        <Button disabled={!resource} type="primary" onClick={handleOk}>
          {buttonText}
        </Button>,
      ]}
    >
      <Radio.Group
        value={type}
        buttonStyle="solid"
        onChange={e => setType(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        {TABPANES.map(i => (
          <Radio.Button key={i.value} value={i.value}>
            {i.name}
          </Radio.Button>
        ))}
      </Radio.Group>
      <ImageResource
        epgId={props.epgId}
        type={type}
        onSelect={handleResourceSelect}
      />
    </Modal>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    visible: state.material.visible,
    type: state.material.type,
    replaceType: state.material.replaceType,
    epgId: state.project.epgId,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    insertBlock: (resource: ResourceItemType) =>
      dispatch({
        type: 'webPage/createBlock',
        payload: {
          pluginType: resource.resourceType + 1,
          width: 360,
          height: 270,
          attribute: {
            url: resource.url,
            name: resource.resourceName,
          },
        },
      }),
    setVisible: (visible: boolean) =>
      dispatch({
        type: 'material/setVisible',
        payload: { visible, replaceType: -1 },
      }),
    setType: (type: number) =>
      dispatch({ type: 'material/setType', payload: type }),
    replaceResource: ({ url }: ResourceItemType) =>
      dispatch({
        type: 'webPage/changeImage',
        payload: { url },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialLib);
