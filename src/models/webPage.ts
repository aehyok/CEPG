import { ModelType, PageStateType, BlockItemType, PageDataItem } from '@/types';
import shortid from 'shortid';
import { denormalize, normalize } from 'normalizr';
import pageList from '@/utils/schema';
import { savePages, getPages } from '@/services';
import { message } from 'antd';

const getDefaultBlock = (): BlockItemType => {
  return {
    id: '',
    cId: shortid.generate(),
    controlName: '',
    locateX: 0,
    locateY: 0,
    locateZ: 1,
    width: 320,
    height: 270,
    pluginType: 'Image',
    canGetFocus: 0,
    focusX: 0,
    focusY: 0,
    focusedAction: {
      stateBlock: '',
      stateChangeType: '',
      mode: 'SetIndex',
      stateContent: '',
      stateIndex: -1,
    },
    focusMove: {
      left: '',
      right: '',
      up: '',
      down: '',
    },
    actionSwitchMode: '',
    actionTarget: '',
    actionType: 0,
    attribute: {
      backColor: '',
      fontColor: '',
      image: '',
      text: '',
      fontSize: 14,
      textAlign: '',
    },
  };
};

const model: ModelType<PageStateType> = {
  state: {
    currentPage: '',
    zIndex: 0,
    pages: {},
    blocks: {},
    activeBlocks: [],
    allPageIds: [],
  },
  reducers: {
    // 置顶
    stickTop(state) {
      const maxZ = Math.max(...Object.values(state.blocks).map(i => i.locateZ));
      if (state.activeBlocks.length === 1) {
        const [cId] = state.activeBlocks;
        state.blocks[cId].locateZ = maxZ + 1;
      }
    },
    // 置底
    stickBottom(state) {
      const minZ = Math.min(...Object.values(state.blocks).map(i => i.locateZ));
      if (state.activeBlocks.length === 1) {
        const [cId] = state.activeBlocks;
        state.blocks[cId].locateZ = minZ - 1;
      }
    },
    createBlock(state, { payload }) {
      const block = getDefaultBlock();
      const { cId } = block;
      const page = state.pages[state.currentPage];

      state.zIndex += 1;
      state.blocks[cId] = { ...block, ...payload, locateZ: state.zIndex };
      state.activeBlocks = [cId];
      page.pluginItem.push(cId);
    },
    updateBlock(state, { payload }) {
      const [blockId] = state.activeBlocks;
      const pageId = state.currentPage;
      if (!blockId) return;

      const item = state.blocks[blockId];
      state.blocks[blockId] = {
        ...item,
        ...payload,
      };
    },
    changeImage(state, { payload }) {
      const [blockId] = state.activeBlocks;
      const pageId = state.currentPage;
      const { url } = payload;
      if (blockId) {
        state.blocks[blockId].attribute.url = url;
        return;
      }
      state.pages[pageId].backgroundImage = url;
    },
    removeBlock(state, { payload }) {
      const { cId } = payload;
      if (!cId) return;
      delete state.blocks[cId];
      if (state.activeBlocks.includes(cId)) {
        state.activeBlocks = state.activeBlocks.filter(i => i !== cId);
      }

      const page = state.pages[state.currentPage];
      page.pluginItem = page.pluginItem.filter(p => p !== cId);
    },
    setActiveBlock(state, { payload }) {
      return {
        ...state,
        activeBlocks: payload,
      };
    },
    init(state, { payload }) {
      const { entities, result } = payload;
      const locateZ = Object.values<any>(entities.block || {}).map(
        i => i.locateZ,
      );
      const maxZ = Math.max(...locateZ);

      state.zIndex = maxZ;
      state.allPageIds = result;
      state.pages = entities.pages || {};
      state.blocks = entities.block || {};
      state.currentPage = result[0];
    },
    setCurrentPage(state, { payload }) {
      const { cId } = payload;
      state.currentPage = cId;
      state.activeBlocks = [];
    },
    createPage(state, { payload }) {
      const { cId } = payload;
      state.pages[cId] = Object.assign(
        {
          name: 'page name',
          epgId: '',
          parentId: '',
          createBy: null,
          pageType: null,
          backgroundImage: null,
          backgroundMusic: null,
          status: 0,
          pluginItem: [],
        },
        payload,
      );
      state.allPageIds.push(cId);
    },
    updatePage(state, { payload }) {
      const { cId } = payload;
      const page = state.pages[cId];

      state.pages[cId] = { ...page, ...payload };
    },
    removePage(state, { payload }) {
      const { cId } = payload;
      const { pages, currentPage, allPageIds } = state;

      delete pages[cId];
      state.allPageIds = allPageIds.filter(id => id !== cId);
      if (currentPage === cId) {
        state.currentPage = allPageIds[0];
      }
    },
    /**
     * 复制页面，需要替换掉原来页面和区块的cId,并且保存id为空
     * @param state
     * @param param1
     */
    copy(state, { payload }) {
      const { cId: copyId } = payload;
      const page = state.pages[copyId];
      const id = shortid.generate();
      const items = page.pluginItem;
      const copies = items.map(i => shortid.generate());

      copies.forEach((cid, index) => {
        const item = state.blocks[items[index]];
        delete item.id;
        state.blocks[cid] = { ...item, cId: cid };
      });
      state.allPageIds.push(id);
      state.pages[id] = {
        ...page,
        id: '',
        cId: id,
        name: `${page.name}-副本`,
        pluginItem: copies,
      };
    },
  },
  effects: {
    throttleUpate: [
      function*({ payload }, { put }) {
        yield put({ type: 'updateBlock', payload });
      },
      { type: 'takeLatest' },
    ],
    *savePages({ payload }, { call, select, put }) {
      const result = yield select(state => {
        return {
          all: state.webPage.allPageIds,
          pages: state.webPage.pages,
          block: state.webPage.blocks,
        };
      });
      const epgId = yield select(state => state.project.epgId);
      const data: PageDataItem[] = denormalize(result.all, pageList, {
        pages: result.pages,
        block: result.block,
      });
      const res = yield call(
        savePages,
        data.map(page => ({ ...page, epgId })),
      );

      if (res.code === 0) {
        message.success('保存成功');
        yield put({ type: 'fetchPages', payload: {} });
      }
    },
    *fetchPages({ payload }, { put, call, select }) {
      const storage = sessionStorage.getItem('persist:epg');
      if (!storage) return;

      // const epgId = yield select(state => state.project.epgId);
      // const result = yield call(getPages, { epgId });
      // const reformResult = result.data.docs.map((i: any) => ({
      //   ...i,
      //   pluginItem: i.pluginItem.map((p: any) => ({
      //     ...p,
      //     attribute: JSON.parse(p.attribute),
      //   })),
      // }));
      // const normalizrData = normalize(reformResult, pageList);
      // yield put({ type: 'init', payload: normalizrData });
    },
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   history.listen(location => {
    //     const storage = sessionStorage.getItem('persist:epg');
    //     if (location.pathname === '/' && !storage) {
    //       dispatch({ type: 'fetchPages' });
    //     }
    //   });
    // },
  },
};

export default model;
