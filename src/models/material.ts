import { ModelType } from '@/types';

export type MaterialState = {
  visible: boolean;
  /**
   * 资源类型
   */
  type: number;
  replaceType: number;
};
export enum ResourceType {
  picture = 1,
}

const model: ModelType<MaterialState> = {
  state: {
    visible: false,
    type: 1,
    replaceType: -1,
  },
  reducers: {
    setVisible(state, { payload }) {
      const { visible, replaceType } = payload;
      state.visible = visible;
      state.replaceType = replaceType;
    },
    setType(state, { payload }) {
      state.type = payload;
    },
    selectMaterial(state, { payload }) {
      state.replaceType = payload;
    },
  },
  effects: {},
};

export default model;
