import {combineReducers} from 'redux';
import {createReducer} from 'redux-act';

const initial = {
  app: {
    username: null
  },
  users: {},
  messages: {
    list: [],
    entities: {}
  },
};

const app = createReducer({
  'login': (state, payload) => {
    console.log("login Action", payload)
    return { ...state, username: payload.username };
  },
  'logout': (state, payload) => {
    return { ...state, username: null };
  },
}, initial.app);

const users = createReducer({
  'add user': (state, payload) => {
    console.log("addUser Action", payload, payload.username)
    return { ...state, [payload.username]: true };
  },
  'remove user': (state, payload) => {
    const newState = { ...state };
    delete newState[payload.username];
    return newState;
  }
}, initial.users);

const messages = createReducer({
  'new message': (state, payload) => {
    const { message } = payload;
    return {
      ...state,
      list: [ ...state.list, message.id ],
      entities: { ...state.entities, [message.id]: message }
    };
  }
}, initial.messages);

export default combineReducers(
  { app, users, messages }
);
