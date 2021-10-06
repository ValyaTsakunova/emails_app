import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/Login';
import AdminPage from './components/AdminPage';

function App() {
  return (
      <BrowserRouter>
        <Route exact path='/' component={Login} />
        <Route exact path='/adminPage' component={AdminPage} />
    </BrowserRouter>
  );
}

export default App;
