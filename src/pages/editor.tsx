import React, { ReactEventHandler } from 'react';
import styles from './editor.less';

import RightPanel from '@/components/RightPanel';
import RndContainer from '@/components/RndContainer';
import { connect, Dispatch } from 'dva';
import { RootState, BlockItemType, PageDataItem } from '@/types';
import PageSettings from '@/components/PageSettings';
import { PageGroup } from '@/components/pageGroup';

type EditorProps = {
  blocks: BlockItemType[];
  dispatch: Dispatch;
  selected: string[];
  current?: string;
  page: PageDataItem;
};
function Editor(props: EditorProps) {
  const { blocks, selected, current, page, dispatch } = props;
  const handleClick: ReactEventHandler<HTMLDivElement> = e => {
    if (!current) return;
    dispatch({ type: 'webPage/setActiveBlock', payload: [] });
  };
  let rightComponent = null;
  if (selected.length) {
    rightComponent = <RightPanel cId={selected[0]} />;
  } else if (current) {
    rightComponent = <PageSettings />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <PageGroup />
        {/* <ColumnSettings /> */}
      </div>
      <main className={styles.main}>
        <div className={styles.canvas} onMouseDown={handleClick}>
          <div
            className={styles.pageBackground}
            style={{ backgroundImage: `url(${page.backgroundImage})` }}
          ></div>
          {blocks.map((c, index) => {
            return <RndContainer {...c} key={c.cId}></RndContainer>;
          })}
        </div>
      </main>
      <div className={styles.rightPanel}>{rightComponent}</div>
    </div>
  );
}
const mapStateToProp = (state: RootState) => {
  const page = state.webPage.pages[state.webPage.currentPage] || {};
  const blocks = Object.values(state.webPage.blocks);
  // if (!page) return { blocks: [], selected: [] };
  return {
    blocks: blocks.filter(b => page.pluginItem.includes(b.cId)),
    selected: state.webPage.activeBlocks,
    page,
    current: state.webPage.currentPage,
  };
};
export default connect(mapStateToProp)(Editor);
