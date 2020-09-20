import { message } from 'antd';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import createUndoRedo from '@/utils/undo-redo';

const persistConfig = {
  timeout: 1000, // you can define your time. But is required.
  key: 'epg',
  storage: storageSession,
  // whitelist: [],
};

const persistEnhancer = () => (createStore: any) => (
  reducer: any,
  initialState: any,
  enhancer: any,
) => {
  const store = createStore(
    persistReducer(persistConfig, reducer),
    initialState,
    enhancer,
  );
  const persist = persistStore(store);
  return {
    ...store,
    persist,
  };
};
export const dva = {
  config: {
    onError(err: ErrorEvent) {
      console.error(err);
      err.preventDefault();
      message.error(err.message);
    },
    extraEnhancers: [persistEnhancer()],
  },
  plugins: [createUndoRedo({ include: ['webPage'], namespace: 'timeline' })],
};
