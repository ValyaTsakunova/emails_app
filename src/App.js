import React, { useReducer } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Context from './context/context';
import { getUsers, searchUsers, load } from './context/actions';
import { ReducerFunction, defaultState } from "./context/reducer";
import './styles/App.css'

function App() {
  const [stateUsers, dispatchUserReducer] = useReducer(ReducerFunction, defaultState);
  const getUsersList = (data) => {dispatchUserReducer(getUsers(data))};
  const search = (data) => {dispatchUserReducer(searchUsers(data))};
  const loading = (data) => {dispatchUserReducer(load(data))}

  return (
    <Context.Provider
    value={{
      usersState: stateUsers,
      getUsersList: (data) => getUsersList(data),
      searchUsers: (data) => search(data),
      loading: (data) => loading(data)
    }}>
      <BrowserRouter>
        <Route exact path='/' component={Login} />
        <Route exact path='/adminPage' component={AdminPage} />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
