import React, { MouseEvent, useRef, useEffect, useCallback } from 'react';
import { Tree, Card, Input, message } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';

import styles from './ColumnTree.less';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import { Dispatch, connect } from 'dva';
import shortid from 'shortid';
import { RootState, CategoryItemType } from '@/types';

type CreateColumnParams = Pick<
  CategoryItemType,
  'cId' | 'categoryName' | 'parentId'
>;
type AlterColumnParams = Partial<CategoryItemType>;
export interface ColumnTreeProps {
  changeTitle: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  alterColumn: (column: AlterColumnParams) => void;
  deleteColumn: (cId: string) => void;
  createColumn: (info: CreateColumnParams) => void;
  list: CategoryItemType[];
}

const { TreeNode } = Tree;
const ColumnTitle: React.FC<CategoryItemType & {
  saveTitle: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}> = ({ saveTitle, cId, categoryName, isEdit }) => {
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [isEdit]);

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.keyCode === 13) {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      message.error('名称不能为空');
      if (inputRef.current) {
        inputRef.current.blur();
      }
      return;
    }
    saveTitle(e, cId);
  };

  const Title = (
    <ContextMenuTrigger id="column" collect={props => ({ cId })}>
      {categoryName}
    </ContextMenuTrigger>
  );
  const EditTitle = (
    <Input
      ref={inputRef}
      size="small"
      defaultValue={categoryName}
      onKeyUp={handleKeyup}
      onBlur={handleBlur}
    />
  );

  return isEdit ? EditTitle : Title;
};

// 找到parentId相同的节点并渲染
const renderTreeNode = ({
  data,
  saveTitle,
  parentId = '',
}: {
  data: CategoryItemType[];
  saveTitle: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  parentId?: string;
}) => {
  const tmpColumns = data.filter(d => d.parentId === parentId);

  return tmpColumns.map(i => {
    if (tmpColumns.length > 0) {
      return (
        <TreeNode
          {...i}
          key={i.cId}
          title={<ColumnTitle saveTitle={saveTitle} {...i} />}
        >
          {renderTreeNode({ data, parentId: i.cId, saveTitle })}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        {...i}
        key={i.cId}
        title={<ColumnTitle {...i} saveTitle={saveTitle} />}
      ></TreeNode>
    );
  });
};

const ColumnTree = (props: ColumnTreeProps) => {
  const { createColumn, changeTitle, alterColumn, deleteColumn, list } = props;

  const remove = useCallback(
    (e: MouseEvent, data: any) => {
      deleteColumn(data.cId);
    },
    [deleteColumn],
  );
  const create = (e: MouseEvent, data: any) => {
    createColumn({
      cId: shortid.generate(),
      categoryName: `栏目 ${list.length + 1}`,
      parentId: data.cId,
    });
  };
  const alterName = (e: MouseEvent, data: any) => {
    alterColumn({ cId: data.cId, isEdit: true });
  };

  const createRoot = () => {
    createColumn({
      cId: shortid.generate(),
      categoryName: '栏目',
      parentId: '',
    });
  };

  return (
    <Card
      title="栏目结构"
      bordered={false}
      extra={<PlusCircleOutlined onClick={createRoot} />}
      size="small"
    >
      <Tree showLine switcherIcon={<DownOutlined />} blockNode>
        {renderTreeNode({ data: list, saveTitle: changeTitle })}
      </Tree>
      <ContextMenu id="column">
        <MenuItem data={{ action: 'child' }} onClick={create}>
          创建子栏目
        </MenuItem>
        <MenuItem data={{ action: 'alter' }} onClick={alterName}>
          修改栏目名称
        </MenuItem>
        <MenuItem data={{ action: 'removed' }} onClick={remove}>
          删除
        </MenuItem>
      </ContextMenu>
    </Card>
  );
};

const mapStateToProps = (state: RootState) => ({
  list: state.column.columnTree,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
  changeTitle: (e: React.ChangeEvent<HTMLInputElement>, id: string) =>
    dispatch({
      type: 'column/update',
      payload: { cId: id, categoryName: e.target.value, isEdit: false },
    }),
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
  deleteClumn: (cId: string) =>
    dispatch({ type: 'column/delete', payload: { cId } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnTree);
