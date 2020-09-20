import React, { MouseEvent, useCallback } from 'react';
import { Tree, Card } from 'antd';
import { DownOutlined, PlusCircleOutlined } from '@ant-design/icons';

// import styles from './ColumnTree.less';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import shortid from 'shortid';
import { CategoryItemType } from '@/types';

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
  selectTreeNode: (key: string | number) => void;
  list: CategoryItemType[];
  selected: number | string;
}

const { TreeNode } = Tree;

// 找到parentId相同的节点并渲染
const renderTreeNode = ({
  data,
  parentId = '',
}: {
  data: CategoryItemType[];
  parentId?: string;
}) => {
  const tmpColumns = data.filter(d => d.parentId === parentId);

  return tmpColumns.map(i => {
    const Title = (
      <ContextMenuTrigger id="column" collect={props => i}>
        {i.categoryName}
      </ContextMenuTrigger>
    );
    if (tmpColumns.length > 0) {
      return (
        <TreeNode {...i} key={i.cId} title={Title}>
          {renderTreeNode({ data, parentId: i.cId })}
        </TreeNode>
      );
    }
    return <TreeNode {...i} key={i.cId} title={Title}></TreeNode>;
  });
};

const ColumnTree = (props: ColumnTreeProps) => {
  const { createColumn, deleteColumn, selectTreeNode, selected, list } = props;

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
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        blockNode
        selectedKeys={[selected]}
        onSelect={(keys, e) => selectTreeNode(keys[0])}
      >
        {renderTreeNode({ data: list })}
      </Tree>
      <ContextMenu id="column">
        <MenuItem data={{ action: 'child' }} onClick={create}>
          创建子栏目
        </MenuItem>
        <MenuItem data={{ action: 'removed' }} onClick={remove}>
          删除
        </MenuItem>
      </ContextMenu>
    </Card>
  );
};

export default ColumnTree;
