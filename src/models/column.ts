import {
  CategoryItemType,
  Reducer,
  UsualEffect,
  EffectWithType,
  PluginType,
} from '@/types';
import { saveColumn, getColumn, getCategoryType } from '@/services';
import { SubscriptionsMapObject } from 'dva';
import { message } from 'antd';

export type CategoryTypeItem = {
  id: string;
  name: string;
  type: PluginType;
};
export type ColumnState = {
  columnTree: CategoryItemType[];
  categoryType: CategoryTypeItem[];
  current: string | number;
};
type ColumnReducers = {
  create: Reducer<ColumnState, CategoryItemType>;
  delete: Reducer<ColumnState, Pick<CategoryItemType, 'cId'>>;
  update: Reducer<ColumnState, CategoryItemType>;
  setCurrent: Reducer<ColumnState, { cId: string }>;
  setColumn: Reducer<ColumnState, CategoryItemType[]>;
  setCategoryType: Reducer<ColumnState, CategoryTypeItem[]>;
};

type ColumnModel = {
  state: ColumnState;
  reducers: ColumnReducers;
  effects: {
    [prop: string]: UsualEffect<ColumnState> | EffectWithType;
  };
  subscriptions: SubscriptionsMapObject;
};

const model: ColumnModel = {
  state: {
    columnTree: [],
    current: '',
    categoryType: [],
  },
  reducers: {
    create: (state, { payload }) => {
      state.columnTree.push(
        Object.assign(
          {
            cId: '',
            epgId: '',
            categoryName: '',
            categoryType: '',
            sequence: 0,
            parentId: '',
            navigate: '',
            backColor: '',
            backgroundImage: '',
            image: '',
            fontSize: 14,
            fontColor: '',
          },
          payload,
        ),
      );
    },
    delete: (state, { payload }) => {
      const { cId } = payload;
      state.columnTree = state.columnTree.filter(
        c => c.cId !== cId || c.parentId === cId,
      );
    },
    update(state, { payload }) {
      const index = state.columnTree.findIndex(c => c.cId === payload.cId);
      if (index > -1) {
        const column = state.columnTree[index];
        state.columnTree[index] = { ...column, ...payload };
      }
    },
    setCurrent(state, { payload }) {
      state.current = payload.cId;
    },
    setColumn(state, { payload }) {
      state.columnTree = payload;
    },
    setCategoryType(state, { payload }) {
      state.categoryType = payload;
    },
  },
  effects: {
    *saveColumns({ payload }, { select, call }) {
      let list: CategoryItemType[] = yield select(
        state => state.column.columnTree,
      );
      const epgId = yield select(state => state.project.epgId);

      message.loading('正在保存...');
      const { code } = yield call(saveColumn(list.map(c => ({ ...c, epgId }))));
      if (code != -1) {
        message.success('保存成功');
      }
    },
    *getColumn({ payload }, { select, call, put }) {
      const epgId = yield select(state => state.project.epgId);
      const res = yield call(getColumn, epgId);

      yield put({ type: 'setColumn', payload: res.data });
    },
    *getType({ payload }, { call, put }) {
      const res = yield call(getCategoryType);
      yield put({ type: 'setCategoryType', payload: res.data });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/editor') {
          dispatch({ type: 'getType' });
        }
      });
    },
  },
};

export default model;
