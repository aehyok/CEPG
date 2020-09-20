import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import styles from './index.less';
import Toolbox from '@/components/Toolbox';
import { Spin } from 'antd';
import MaterialLib from '@/components/MaterialLib';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.container}>
      <PersistGate
        persistor={persistStore((window as any).g_app._store)}
        loading={
          <Spin>
            <div style={{ width: '100vw', height: '100vh' }}></div>
          </Spin>
        }
      >
        <MaterialLib />
        <Toolbox />

        {props.children}
      </PersistGate>
    </div>
  );
};

export default BasicLayout;
