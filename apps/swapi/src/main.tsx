import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { Provider } from 'react-redux';
import { store } from '@starwars/swapi-data-access';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
