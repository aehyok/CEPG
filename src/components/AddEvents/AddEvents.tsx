import React from 'react';
import { Select } from 'antd';
import { RootState, PageDataItem, BlockItemType } from '@/types';
import { connect, Dispatch } from 'dva';

const { Option } = Select;

export type AddEventProps = {
  pages: PageDataItem[];
  dispatch: Dispatch;
} & Pick<BlockItemType, 'actionType' | 'actionTarget' | 'cId'>;

const AddEvents: React.FC<AddEventProps> = props => {
  const { actionType, actionTarget, cId, pages, dispatch } = props;

  const onChange = (n: number | string, field: string) => {
    dispatch({ type: 'webPage/updateBlock', payload: { [field]: n, cId } });
  };

  return (
    <div style={{ padding: '0 8px' }}>
      <div style={{ marginBottom: '10px' }}>
        <span style={{display:"inline-block",width:'35px'}} >行为</span>
        <Select
          placeholder="请选择"
          allowClear
          style={{ width: '150px' }}
          value={actionType}
          size="small"
          onChange={value => onChange(value, 'actionType')}
        >
          <Option value={0}>页面跳转</Option>
        </Select>
      </div>
      <div>
        <span  style={{display:"inline-block",width:'35px'}} >目标</span>
        <Select
          style={{ width: '150px' }}
          placeholder="请选择"
          allowClear
          size="small"
          value={actionTarget}
          onChange={value => onChange(value, 'actionTarget')}
        >
          {pages.map(p => (
            <Option value={p.cId} key={p.cId}>
              {p.name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    pages: Object.values(state.webPage.pages),
  };
};

export default connect(mapStateToProps)(AddEvents);
