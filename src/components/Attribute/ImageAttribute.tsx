import React from 'react';
import { Button, Select, Card } from 'antd';
import { RootState } from '@/types';
import { Dispatch, connect } from 'dva';

type ImageAttrProps = {
  showLib: () => void;
  sourceMode: 'Category' | 'Static';
  size: 'auto' | 'cover' | 'contain';
  data: string;
};
const { Option } = Select;

const ImageAttribute: React.FC<ImageAttrProps> = props => {
  const { showLib, sourceMode, data, size } = props;
  return (
    <Card title="属性" bordered={false} size="small" style={{ marginTop: 10 }}>
      <Select size="small" value={sourceMode} style={{ width: 100 }} allowClear>
        <Option value="Category">栏目</Option>
        <Option value="Static">静态</Option>
      </Select>
      <div>图片</div>
      <Button type="link" onClick={showLib}>
        从素材库选择
      </Button>
    </Card>
  );
};
const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showLib: () =>
      dispatch({
        type: 'material/setVisible',
        payload: {
          visible: true,
          replaceType: 1,
          type: 1,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageAttribute);
