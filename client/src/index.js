// Entry Point
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './components/App';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react'

let {persistor, store} = configureStore()



if(typeof window !== 'undefined') { 
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading </div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    , document.querySelector('.container')
  );
}