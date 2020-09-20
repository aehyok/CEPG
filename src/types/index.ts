import {
  EffectsCommandMap,
  SubscriptionsMapObject,
  EffectType,
  Effect,
} from 'dva';
import { IUndoRedoState } from '@/utils/undo-redo';
import { ColumnState } from '@/models/column';
import { ProjectState } from '@/models/project';
import { MaterialState } from '@/models/material';

export type Action<T = any> = {
  type: string;
  payload: T;
};

export type UsualEffect<S> = (
  action: Action,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: RootState) => T) => T;
  },
) => void;

export type Reducer<S, T = any> = (state: S, action: Action<T>) => S | void;
export type EffectWithType = [Effect, { type: EffectType; ms?: number }];
export type ModelType<S> = {
  state: S;
  reducers: {
    [property: string]: Reducer<S>;
  };
  effects: {
    [prop: string]: UsualEffect<S> | EffectWithType;
  };
  subscriptions?: SubscriptionsMapObject;
};

export type RootState = {
  webPage: PageStateType;
  column: ColumnState;
  timeline: IUndoRedoState;
  project: ProjectState;
  material: MaterialState;
  loading: {
    global: boolean;
    models: {
      [key: string]: boolean;
    };
    effects: {
      [key: string]: boolean;
    };
  };
};

export enum PageType {
  'BootPosition' = '欢迎页',
  'HomePage' = '主页',
  'Category' = '栏目',
  'VOD' = '电影',
  'Series' = '剧集',
  'LiveTV' = '直播频道',
  'Picture' = '图片',
  'Video' = '视频',
}

export type TextAttributeType = {
  backColor: string;
  image: string;
  text: string;
  textAlign: string;
  fontSize: number;
  fontColor: string;
};
export type ImageAttributeType = {
  url: string;
};
export type StreamAttributeType = {
  url: string;
};

export type ResourceItemType = {
  id: string;
  resourceName: string;
  /**
   * 1 = 图片， 2 = 视频, 4 = 音频, 5=流媒体, 6=URL链接
   */
  resourceType: 1 | 2 | 4 | 5 | 6;
  thumb: string;
  playTime: number;
  size: number;
  width: number;
  height: number;
  containsVideo: boolean;
  url: string;
  widgetType: number;
};

export interface CategoryItemType {
  cId: string;
  isEdit?: boolean;
  epgId: string;
  categoryName: string;
  categoryType: string;
  parentId: string;
  navigate: string;
  backColor: string;
  backgroundImage: string;
  image: string;
  text: string;
  fontName: string;
  fontSize: number;
  fontColor: string;
}

export interface PageDataItem {
  editable: boolean;
  id: string;
  cId: string;
  epgId?: string;
  name: string;
  parentId: string;
  createBy?: string;
  pageType?: string;
  backgroundImage?: string;
  backgroundMusic?: string;
  status: number;
  pluginItem: string[];
}

/**
 * 插件类型 CatBlock栏目块、CatListH 横版栏目条、CatListV竖版栏目条、
 *  Text文本、Image图片、Video视频、Button按钮、PicList图片列表、
 * Picshuffling图片轮播、VideoShuffling视频轮播、StateBlock状态块、AdBlock推荐位
 */
export type PluginType =
  | 'CatBlock'
  | 'CatListH'
  | 'CatListV'
  | 'Text'
  | 'Image'
  | 'Video'
  | 'Button'
  | 'PicList'
  | 'PicsShuffling'
  | 'StateBlock'
  | 'AdBlock'
  | 'DateTimeBlock';

export type FocusMoveType = {
  left: string;
  right: string;
  up: string;
  down: string;
};

export type FocusedActionType = {
  stateBlock: string;
  mode: 'SetIndex' | 'SetContent';
  stateIndex: number;
  stateChangeType: string;
  stateContent: string;
};

export type BlockItemType = {
  id?: string;
  /**
   * 组件名称
   */
  name?: string;
  cId: string;
  controlName: string;
  locateX: number;
  locateY: number;
  locateZ: number;
  width: number;
  height: number;

  pluginType: PluginType;
  canGetFocus: 0 | 1;
  focusMove: FocusMoveType;
  focusX: 0;
  focusY: 0;
  focusedAction: FocusedActionType;
  actionType: 0 | 1;
  actionTarget: string;
  actionSwitchMode: string;
  attribute: any;
};

export interface PageStateType {
  activeBlocks: string[];
  blocks: {
    [key: string]: BlockItemType;
  };
  pages: {
    [key: string]: PageDataItem;
  };
  zIndex: number;
  allPageIds: string[];
  currentPage: string;
}

export type TextAlign =
  | 'TL'
  | 'TC'
  | 'TR'
  | 'ML'
  | 'MC'
  | 'MR'
  | 'BL'
  | 'BC'
  | 'BR';

export type EpgListItemType = {
  epgId: string;
  projectType: string;
  epgName: string;
  version: string;
  resolutionWidth: number;
  resolutionHeight: number;
  screenDirection: number;
  remark: string;
  content: string;
  md5: string;
  id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
