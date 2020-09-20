import React, { ReactElement, useState } from 'react';
import { connect, Dispatch } from 'dva';
import { Rnd, RndResizeCallback } from 'react-rnd';
import { DraggableEventHandler } from 'react-draggable';

import styles from './RndContainer.less';
import { RootState, BlockItemType, PluginType } from '@/types';
import { EpgText, EpgImage, EpgColumn, EpgVideo } from '@/components/widgets';
import { DeleteOutlined } from '@ant-design/icons';

const resizer = [
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomRight',
  'bottomLeft',
  'left',
  'right',
];
const generateResizeHandleClasses = resizer.reduce(
  (acc, cur) => ({ ...acc, [cur]: `resize-handle-${cur}` }),
  {},
);

export type RndContainerProps = BlockItemType & {
  activeBlocks: string[];
  dispatch: Dispatch;
};

const getWidget = (type: PluginType, attribute: any): ReactElement => {
  const widgetMap: { [T in PluginType]: React.ReactElement } = {
    CatBlock: <div>栏目块</div>,
    PicList: <div>图片列表属性</div>,
    PicsShuffling: <div>图片轮播</div>,
    CatListH: <div>横版栏目条</div>,
    CatListV: <div>竖版栏目条</div>,
    AdBlock: <div>广告位属性</div>,
    Text: <EpgText {...attribute} />,
    Image: <EpgImage {...attribute}></EpgImage>,
    Video: <EpgVideo {...attribute}></EpgVideo>,
    StateBlock: <div>状态组件属性</div>,   
    Button: <div>按钮属性</div>,
    DateTimeBlock:<div>日期时间组件</div>
  };
  return widgetMap[type];
};

function RndContainer({
  locateX: x,
  locateY: y,
  locateZ,
  width,
  height,
  pluginType,
  cId,
  attribute,
  activeBlocks,
  dispatch,
  name,
}: RndContainerProps) {
  const [lockRatio, setLockRatio] = useState(false);

  const isActive = activeBlocks.includes(cId);

  const onDragStop: DraggableEventHandler = (e, { x, y }) => {
    dispatch({
      type: 'webPage/updateBlock',
      payload: { locateX: x, locateY: y, cId },
    });
  };

  const handleDragStart: DraggableEventHandler = (e, {}) => {
    e.stopPropagation();
    if (!activeBlocks.includes(cId)) {
      dispatch({
        type: 'webPage/setActiveBlock',
        payload: [cId],
        replace: true,
      });
    }
  };
  const handleResizeStop: RndResizeCallback = (
    e,
    dir,
    ref,
    delta,
    position,
  ) => {
    const w = width + delta.width;
    const h = height + delta.height;

    dispatch({
      type: 'webPage/updateBlock',
      payload: {
        locateX: position.x,
        locateY: position.y,
        width: w,
        height: h,
        cId,
      },
    });
  };

  return (
    <Rnd
      className={isActive ? styles.draggble : ''}
      bounds="parent"
      resizeHandleClasses={generateResizeHandleClasses}
      position={{ x, y }}
      style={{ zIndex: locateZ }}
      size={{ width, height }}
      enableResizing={resizer.reduce(
        (prev, cur) => ({ ...prev, [cur]: isActive }),
        {},
      )}
      lockAspectRatio={lockRatio}
      onDragStop={onDragStop}
      onDragStart={handleDragStart}
      onResize={e => setLockRatio(e.shiftKey)}
      onResizeStop={handleResizeStop}
    >
      <div className={styles['draggble-inner']}>
        <span
          className={styles.delete}
          onClick={() =>
            dispatch({ type: 'webPage/removeBlock', payload: { cId } })
          }
        >
          <DeleteOutlined />
        </span>
        {getWidget(pluginType, attribute) || <div>{name}</div>}
      </div>
    </Rnd>
  );
}

const mapStateToProps = (state: RootState) => {
  const [currentBlockId] = state.webPage.activeBlocks;
  return {
    activeBlocks: [currentBlockId],
  };
};

export default connect(mapStateToProps)(RndContainer);
