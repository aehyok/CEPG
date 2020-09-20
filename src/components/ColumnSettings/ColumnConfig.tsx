import React from 'react';
import { Row, Col, Input, Select } from 'antd';
import { RootState, CategoryItemType, PageDataItem } from '@/types';
import { connect, Dispatch } from 'dva';

export type ColumnConfigProps = {
  detail?: CategoryItemType;
  dispatch: Dispatch;
  pages: PageDataItem[];
};
const { Option } = Select;
const ColumnConfig: React.FC<ColumnConfigProps> = props => {
  const { detail, dispatch, pages } = props;

  if (!detail) return <div>请单击选择一个栏目</div>;
  return (
    <>
      <Row align="middle" style={{ marginBottom: '10px' }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          栏目名称：
        </Col>
        <Col span={16}>
          <Input
            value={detail.categoryName}
            onChange={e =>
              dispatch({
                type: 'column/update',
                payload: { cId: detail.cId, categoryName: e.target.value },
              })
            }
          ></Input>
        </Col>
      </Row>
      <Row align="middle" style={{ marginBottom: '10px' }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          跳转页面：
        </Col>
        <Col span={16}>
          <Select
            style={{ width: '150px' }}
            placeholder="请选择"
            allowClear
            value={detail.navigate}
            onChange={value =>
              dispatch({
                type: 'column/update',
                payload: { cId: detail.cId, navigate: value },
              })
            }
          >
            {pages.map(p => (
              <Option value={p.cId} key={p.cId}>
                {p.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row align="middle" style={{ marginBottom: '10px' }}>
        <Col span={6} style={{ textAlign: 'right' }}>
          栏目图标：
        </Col>
        <Col span={16}></Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  const { current } = state.column;
  const item = state.column.columnTree.find(({ cId }) => cId === current);

  return { detail: item, pages: Object.values(state.webPage.pages) };
};

export default connect(mapStateToProps)(ColumnConfig);
