import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Components
import Login from './components/loginView/login';
import App from './App';

// This requires are to be able to use JSX on webpack without changing
// the normal syntax.-
require('babel-core/register');
require('babel-polyfill');

const initialState = {
  nowPlaying: { name: 'Not Checked', albumArt: '', artist: '' },
  searchValue: '',
  whatToSearch: '',
  searchPage: 0,
  searchResult: false,
  moreToSearch: false,
  specificShow: false,
  privateSpecificShow: false,
  profile: false,
  savedTracks: false,
  isFavourite: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GO_PROFILE':
      return {
        ...state,
        profile: action.profile,
        savedTracks: action.savedTracks
      };

    case 'GO_SEARCH':
      return {
        ...state,
        profile: false
      };

    case 'CHANGE_NOWPLAYING':
      return {
        ...state,
        nowPlaying: action.nowPlaying
      }

    case 'GET_SOMETHING':
      return {
        ...state,
        specificShow: action.specificShow,
        whatToSearch: action.whatToSearch,
        isFavourite: action.isFavourite
      };

    case 'ABOUT_SEARCH_SOMETHING':
      return {
        ...state,
        specificShow: action.specificShow,
        searchPage: action.searchPage,
        searchValue: action.searchValue,
        searchResult: action.searchResult
      };

    case 'SEARCH_SOMETHING':
      return {
        ...state,
        moreToSearch: action.moreToSearch,
        whatToSearch: action.whatToSearch,
        searchResult: action.searchResult
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    {/* <BrowserRouter basename="/valentify/"> */}
    <BrowserRouter basename="/valentify/">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/callback" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
