import { ModelType } from '@/types';

export type ProjectState = {
  epgId: string;
  width: number;
  height: number;
  token: string;
};
const model: ModelType<ProjectState> = {
  state: {
    epgId: '',
    width: 1280,
    height: 720,
    token: '',
  },
  reducers: {
    update(state, { type, payload }) {
      state.epgId = payload.epgId;
      state.token = payload.t;
    },
  },
  effects: {},
  subscriptions: {
    hisotry({ dispatch, history }) {
      // const query = (history.location as any).query;
      // dispatch({
      //   type: 'update',
      //   payload: {
      //     epgId: query.eid,
      //     token: query.t,
      //   },
      // });
      // dispatch({ type: 'column/getColumn' });
      // dispatch({ type: 'webPage/fetchPages' });
    },
  },
};

export default model;
