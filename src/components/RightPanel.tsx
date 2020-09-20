import React from 'react';
import { Tabs, Input } from 'antd';
import { connect, Dispatch } from 'dva';
import { RootState, BlockItemType } from '@/types';

import PositionAndSize from './PositionAndSize';
import FocusAxis from '@/components/FocusAxis';
import { AddEvents } from './AddEvents';
import { getAttributeComponent } from './Attribute/Attribute';
import { OnMoveChangeFunc } from './FocusAxis/FocusAxis';

const { TabPane } = Tabs;

export type RightPanelProps = BlockItemType & {
  updateMovable: OnMoveChangeFunc;
  update: (value: number | string, filed: string) => void;
  handleRectChange: (value: number | undefined, filed: string) => void;
  screenWidth: number;
  screenHeight: number;
  blockList: BlockItemType[];
};

const RightPanel = (props: RightPanelProps) => {
  const {
    locateX,
    locateY,
    locateZ,
    attribute,
    name,
    width,
    height,
    canGetFocus,
    screenHeight,
    screenWidth,
    actionType,
    actionTarget,
    cId,
    blockList,
    focusMove,
    focusedAction,
    updateMovable,
    update,
    handleRectChange,
  } = props;

  // const changeName: React.ChangeEventHandler<HTMLInputElement> = e => {
  //   dispatch({
  //     type: 'webPage/updateBlock',
  //     payload: { name: e.target.value, cId },
  //   });
  // };
  return (
    <Tabs
      size="small"
      animated={false}
      style={{ overflow: 'initial', padding: '0 10px' }}
    >
      <TabPane tab="样式" key="1">
        <Input onChange={e => update(e.target.value, 'name')} value={name} />
        <PositionAndSize
          {...{ locateX, locateY, locateZ, width, height, cId }}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
          onRectChange={handleRectChange}
        />
        {cId && getAttributeComponent(props.pluginType, { attribute, cId })}
      </TabPane>
      <TabPane tab="焦点" key="2">
        <FocusAxis
          {...focusMove}
          blockList={blockList}
          canFocus={canGetFocus}
          update={update}
          onMoveChange={updateMovable}
          focusedAction={focusedAction}
        />
      </TabPane>
      <TabPane tab="事件" key="3">
        <AddEvents {...{ actionTarget, actionType, cId }} />
      </TabPane>
    </Tabs>
  );
};
const mapStateToProps = (state: RootState) => {
  const [currentId] = state.webPage.activeBlocks;
  const list = Object.values(state.webPage.blocks).filter(
    i => i.cId !== currentId,
  );
  const { width: screenWidth, height: screenHeight } = state.project;
  return {
    ...state.webPage.blocks[currentId],
    screenHeight,
    screenWidth,
    blockList: list,
  };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: { cId: string }) => {
  return {
    updateMovable: (prop: Partial<BlockItemType>) =>
      dispatch({
        type: 'webPage/updateBlock',
        payload: {
          cId: ownProps.cId,
          ...prop,
        },
      }),
    update: (n: number | string, field: string) => {
      dispatch({
        type: 'webPage/updateBlock',
        payload: { [field]: n, cId: ownProps.cId },
      });
    },
    handleRectChange: (n: number | undefined, field: string) => {
      dispatch({
        type: 'webPage/updateBlock',
        payload: { [field]: n, cId: ownProps.cId },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
