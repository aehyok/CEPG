import React from 'react';
import { Collapse } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { RootState, PluginType, PageDataItem } from '@/types';
import { connect, Dispatch } from 'dva';
import { CategoryTypeItem } from '@/models/column';
import shortid from 'shortid';
import DocumentList from '../DocumentList';

const { Panel } = Collapse;

const getExtra = (
  data: CategoryTypeItem,
  create: CreateCategoryFunc,
  name: string,
) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    create(data.type, name);
  };
  return <PlusCircleOutlined onClick={handleClick} />;
};

type PageGroupProp = {
  categoryTypeList: CategoryTypeItem[];
  pages: PageDataItem[];
  currentPage: string;
};

type CreateCategoryFunc = (type: PluginType, name: string) => void;
type TDispatchProp = {
  createCategory: CreateCategoryFunc;
};
const PageGroup = (props: PageGroupProp & TDispatchProp) => {
  const { categoryTypeList, pages, currentPage, createCategory } = props;
  const activeKeys = categoryTypeList.map(c => c.id);
  const derivedPages = (type: PluginType) =>
    pages.filter(p => p.pageType === type);
  return (
    <Collapse defaultActiveKey={activeKeys}>
      {categoryTypeList.map(c => (
        <Panel
          extra={getExtra(c, createCategory, `page${pages.length + 1}`)}
          header={c.name}
          key={c.id}
        >
          <DocumentList
            contextMenuId={c.id}
            current={currentPage}
            pages={derivedPages(c.type)}
          />
        </Panel>
      ))}
    </Collapse>
  );
};
const mapStateToProp = (state: RootState) => {
  return {
    categoryTypeList: state.column.categoryType,
    pages: Object.values(state.webPage.pages),
    currentPage: state.webPage.currentPage,
  };
};
const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    createCategory(type: PluginType, name: string) {
      const id = shortid.generate();
      dispatch({
        type: 'webPage/createPage',
        payload: {
          cId: id,
          pageType: type,
          editable: true,
          name,
        },
      });
    },
  };
};

export default connect<PageGroupProp, TDispatchProp, {}, RootState>(
  mapStateToProp,
  mapDispatchToProp,
)(PageGroup);
