import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import {store} from './store/index'
import './styles/App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path='/' component={Login} />
        <Route exact path='/adminPage' component={AdminPage} />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
