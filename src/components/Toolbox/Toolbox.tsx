import React, { useCallback, useState } from 'react';
import { Button, Dropdown, Menu, Space, Tooltip, Modal, Radio } from 'antd';
import {
  ExportOutlined,
  ImportOutlined,
  UndoOutlined,
  RedoOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import styles from './Toolbox.less';
import { RootState } from '@/types';
import { connect } from 'dva';
import { ToolboxRight } from './ToolboxRight';

// const ArrangeMenu = () => {
//   return (
//     <Menu>
//       <Menu.Item key="1">a</Menu.Item>
//       <Menu.Item key="2">b</Menu.Item>
//       <Menu.Item key="3">c</Menu.Item>
//     </Menu>
//   );
// };
// const seqMenu = () => {
//   return (
//     <Menu>
//       <Menu.Item key="1">置顶</Menu.Item>
//       <Menu.Item key="2">置底</Menu.Item>
//     </Menu>
//   );
// };

const ToolboxLeft: React.FC = (props: any) => {
  const { dispatch, timeline } = props;

  const savePages = () => {
    dispatch({ type: 'webPage/savePages' });
  };
  const undo = useCallback(() => {
    dispatch({ type: 'timeline/undo' });
  }, [dispatch]);
  const redo = useCallback(() => {
    dispatch({ type: 'timeline/redo' });
  }, [dispatch]);

  return (
    <div>
      <Tooltip title="保存">
        <Button onClick={savePages}>
          <CloudUploadOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button onClick={undo} disabled={!timeline.canUndo}>
          <UndoOutlined />
          {timeline.undoCount}
        </Button>
      </Tooltip>

      <Tooltip title="重做">
        <Button onClick={redo} disabled={!timeline.canRedo}>
          <RedoOutlined />
          {timeline.redoCount}
        </Button>
      </Tooltip>
      <Tooltip title="导入">
        <Button>
          <ImportOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="导出">
        <Button>
          <ExportOutlined />
        </Button>
      </Tooltip>
    </div>
  );
};

const Toolbox = (props: any) => {
  // const { dispatch, currentPage } = props;

  return (
    <div className={styles.toolbox}>
      <ToolboxLeft {...props} />
      <div>
        {/* <Dropdown overlay={<ArrangeMenu />}>
          <Button>
            排列
            <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={seqMenu}>
          <Button>
            顺序
            <DownOutlined />
          </Button>
        </Dropdown> */}
      </div>
      <ToolboxRight {...props} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    currentPage: state.webPage.currentPage,
    timeline: state.timeline,
  };
};

export default connect(mapStateToProps)(Toolbox);
