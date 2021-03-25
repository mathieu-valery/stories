// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { CreateHistory as history } from 'history'

//internal modules
import Home from './containers/Home'

import './App.css'

// State and reducers
import postsReducer from './reducers/posts_reducer'
import commentsReducer from './reducers/comments_reducer'
import likesReducer from './reducers/likes_reducer'
import userLoggedReducer from './reducers/userLogged_reducer'
import followsReducer from './reducers/follows_reducer'
import usersReducer from './reducers/users_reducer'

const initialState = {
  users: [],
  posts: [],
  comments: [],
  likes: [],
  user_logged: {},
  follows: []
};

const middlewares = applyMiddleware(logger, ReduxPromise);

const reducers = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  user_logged: userLoggedReducer,
  follows: followsReducer
});

function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        
        <Route exact path="/" component={Home}/>
        <Route exact path="/posts" component={Home}/>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App

ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('react-app')
);
