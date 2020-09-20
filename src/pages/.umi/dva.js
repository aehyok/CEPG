import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'column', ...(require('E:/SunlightGitLab/vepg/server-ui/src/models/column.ts').default) });
app.model({ namespace: 'material', ...(require('E:/SunlightGitLab/vepg/server-ui/src/models/material.ts').default) });
app.model({ namespace: 'project', ...(require('E:/SunlightGitLab/vepg/server-ui/src/models/project.ts').default) });
app.model({ namespace: 'webPage', ...(require('E:/SunlightGitLab/vepg/server-ui/src/models/webPage.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
