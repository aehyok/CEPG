import React from 'react';
import { RootState, PageDataItem } from '@/types';
import { connect, Dispatch } from 'dva';
import { Card, Select, Button } from 'antd';
import ColorPicker from '../ColorPicker';

const pageTypeList = [
  { value: 'BootPosition', name: '欢迎页' },
  { value: 'HomePage', name: '主页' },
  { value: 'Category', name: '栏目' },
  { value: 'VOD', name: '电影' },
  { value: 'Series', name: '剧集' },
  { value: 'LiveTV', name: '直播频道' },
  { value: 'Picture', name: '图片' },
  { value: 'Video', name: '视频' },
];

const PageSettings = (props: any) => {
  const { updatePage, showLib, pageType, current } = props;

  return (
    <>
      <Card size="small" title="页面配置" bordered={false}>
        <div  style={{marginTop:'6px'}}>
          <span>页面类型:</span>
          <Select
            style={{ width: '120px' }}
            value={pageType}
            size="small"
            onChange={value => updatePage({ pageType: value, cId: current })}
          >
            {pageTypeList.map(type => (
              <Select.Option value={type.value} key={type.value}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex',marginTop:'6px' }} >
          <span>背景:</span>
          <ColorPicker color={'#2ac'}></ColorPicker>
        </div>
        <div  style={{marginTop:'6px'}}>
          <div>背景图：</div>
          <img style={{ width: '50%' }} src={props.backgroundImage} alt="" />
          <Button type="link" onClick={showLib}>
            从素材库选择
          </Button>
          <Button
            type="link"
            onClick={() => updatePage({ backgroundImage: '', cId: current })}
          >
            清除
          </Button>
        </div>
      </Card>
    </>
  );
};
const mapStateToProps = (state: RootState) => {
  const current = state.webPage.currentPage;

  if (!current) return {};
  return {
    backgroundImage: state.webPage.pages[current].backgroundImage,
    pageType: state.webPage.pages[current].pageType,
    current,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showLib: () =>
      dispatch({
        type: 'material/setVisible',
        payload: {
          visible: true,
          replaceType: 1,
          type: 1,
        },
      }),
    updatePage: (page: PageDataItem) =>
      dispatch({
        type: 'webPage/updatePage',
        payload: page,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSettings);
