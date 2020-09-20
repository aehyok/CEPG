import shortid from 'shortid';
import React, { useCallback, useState } from 'react';
import styles from './DocumentList.less';
import { connect, Dispatch } from 'dva';
import { PageDataItem } from '@/types';
import DocumentListItem from './DocumentListItem';
import { ContextMenu, MenuItem } from 'react-contextmenu';

type DocumentListProps = { dispatch: Dispatch } & {
  pages: PageDataItem[];
  current: string;
  contextMenuId: string;
};
export type ClickHandler = (e: React.MouseEvent, i: { cId: string }) => void;

const DocumentList = (props: DocumentListProps) => {
  const { pages, current, contextMenuId, dispatch } = props;

  const handleClick = useCallback<ClickHandler>(
    (e, i) => {
      dispatch({
        type: 'webPage/setCurrentPage',
        payload: { cId: i.cId },
      });
    },
    [dispatch],
  );
  const handleContextClick = (e: React.MouseEvent, data: any) => {
    const { action, cId } = data;

    if (action === 'rename') {
      dispatch({
        type: 'webPage/updatePage',
        payload: { cId, editable: true },
      });
    }
    if (action === 'removed') {
      dispatch({ type: 'webPage/removePage', payload: { cId } });
    }
    if (action === 'copy') {
      dispatch({ type: 'webPage/copy', payload: { cId } });
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, cId: string) => {
    dispatch({
      type: 'webPage/updatePage',
      payload: { name: e.target.value, cId, editable: false },
    });
  };

  return (
    <>
      <ul className={styles['doc-list']}>
        {Object.values(pages).map(i => (
          <DocumentListItem
            {...i}
            active={current === i.cId}
            key={i.cId}
            editable={i.editable}
            onClick={handleClick}
            contextId={contextMenuId}
            onBlur={e => handleBlur(e, i.cId)}
          />
        ))}
      </ul>
      <ContextMenu id={contextMenuId}>
        {/* <MenuItem
          disabled={true}
          data={{ action: 'copy' }}
          onClick={handleContextClick}
        >
          创建副本
        </MenuItem> */}
        <MenuItem data={{ action: 'rename' }} onClick={handleContextClick}>
          重命名
        </MenuItem>
        <MenuItem data={{ action: 'removed' }} onClick={handleContextClick}>
          删除
        </MenuItem>
      </ContextMenu>
    </>
  );
};
// const mapStateToProps = (state: RootState) => ({
//   pages: state.webPage.pages,
//   current: state.webPage.currentPage,
//   epgId: state.project.epgId,
// });
// const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
//   return {
//     renamePage(cId: string) {
//       dispatch({
//         type: 'webPage/updatePage',
//         payload: { cId, editable: true },
//       })
//     },
//     removePage(cId: string) {
//       dispatch({ type: 'webPage/removePage', payload: { cId } })
//     },
//     createPage() {
//       dispatch({ type: 'webPage/createPage', payload: {}})
//     }
//   };
// };

export default connect()(DocumentList);
