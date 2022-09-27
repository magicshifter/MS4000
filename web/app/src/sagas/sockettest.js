import io from 'socket.io-client';
import {eventChannel} from 'redux-saga';
import {call, cancel, fork, put, take} from 'redux-saga/effects';
import {addUser, login, logout, newMessage, removeUser} from '../actions/socket';

function connect() {
  const socket = io('http://localhost:8123');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribeMS3000(socket) {
  return eventChannel(emit => {
    socket.on('state.login', ({ username }) => {
      emit(addUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => {};
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ username }) => {
      emit(addUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take('send message');
    socket.emit('message', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    let x = yield take('login');

    console.log("action", x)


    let { payload } = x
    const socket = yield call(connect);
    socket.emit('login', { username: payload.username });

    const task = yield fork(handleIO, socket);

    let action = yield take('logout');
    yield cancel(task);
    socket.emit('logout');
  }
}

export default function* rootSaga() {
  console.log("chat saga active")
  yield fork(flow);
}
