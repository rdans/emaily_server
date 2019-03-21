//redux -> holding all the state or daata
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //container that glue react and redux
import { createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk'; //to create a synchronous request/hold authentication


import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
