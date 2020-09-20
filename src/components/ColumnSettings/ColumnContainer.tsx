import React, { useState } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { Dispatch, connect } from 'dva';
import { RootState, CategoryItemType } from '@/types';
import ColumnTree, { ColumnTreeProps } from './ColumnTree';
import ColumnConfig from './ColumnConfig';

type CreateColumnParams = Pick<
  CategoryItemType,
  'cId' | 'categoryName' | 'parentId'
>;
type AlterColumnParams = Partial<CategoryItemType>;

const ColumnSettings = (
  props: ColumnTreeProps & { saveColumn: Function; saving: boolean },
) => {
  const { saveColumn, saving } = props;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        栏目配置
      </Button>
      <Modal
        title="栏目配置"
        visible={visible}
        width="40%"
        okButtonProps={{ loading: saving }}
        onOk={() => saveColumn()}
        onCancel={() => setVisible(false)}
      >
        <Row>
          <Col span={8}>
            <ColumnTree {...props}></ColumnTree>
          </Col>
          <Col span={16}>
            <ColumnConfig />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  list: state.column.columnTree,
  selected: state.column.current,
  saving: state.loading.effects['column/saveColumns'],
});
const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
  saveColumn: () => {
    dispatch({ type: 'column/saveColumns' });
  },
  alterColumn: (info: AlterColumnParams) => {
    dispatch({ type: 'column/update', payload: { ...info } });
  },
  createColumn: ({ cId, categoryName, parentId }: CreateColumnParams) =>
    dispatch({
      type: 'column/create',
      payload: {
        cId,
        categoryName,
        parentId,
      },
    }),
  selectTreeNode: (id: string | number) => {
    dispatch({ type: 'column/setCurrent', payload: { cId: id } });
  },
  deleteColumn: (cId: string) =>
    dispatch({ type: 'column/delete', payload: { cId } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnSettings);
