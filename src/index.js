import React from "react";
import { createStore, applyMiddleware } from 'redux'
import { render } from "react-dom";
import { Provider } from 'react-redux'
import App from "./components/App";
import reducer from "./reducers";
import thunkMiddleware from 'redux-thunk'
//import createLogger from 'redux-logger'

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root"));