import React from 'react';
import { renderToString } from 'react-dom/server';

import dva from 'dva';
import { RouterContext, createMemoryHistory } from 'dva/router';

import { routes as _routes } from '../views/Home/router';

export function renderHTML(initialState, renderProps) {
  // 1. Initialize
  const app = dva({
    history: createMemoryHistory(),
    initialState,
  });

  // 2. Plugins
  // app.use({});

  // 3. Model
  app.model(require('../models/navigationBar')); // eslint-disable-line

  // 4. Router
  app.router(({ routerRenderProps }) => {
    return <RouterContext {...routerRenderProps} />;
  });

  return renderToString(app.start()({ routerRenderProps: renderProps }));
}

export const routes = _routes;
