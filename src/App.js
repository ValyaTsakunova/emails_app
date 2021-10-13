import React, { useReducer } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Context from './context/context';
import { getUsers } from './context/actions';
import { ReducerFunction, defaultState } from "./context/reducer";
import './styles/App.css'

function App() {
  const [stateUser, dispatchUserReducer] = useReducer(ReducerFunction, defaultState);
  const getUsersList = (data) => {
    dispatchUserReducer(getUsers(data));
  };

  return (
    <Context.Provider
    value={{
      userState: stateUser,
      getUsersList: (data) => getUsersList(data),
    }}

    >
      <BrowserRouter>
        <Route exact path='/' component={Login} />
        <Route exact path='/adminPage' component={AdminPage} />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
