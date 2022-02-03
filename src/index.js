import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';

const store = createStore(reducer, applyMiddleware(thunk));
window.history.scrollRestoration = 'manual';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
