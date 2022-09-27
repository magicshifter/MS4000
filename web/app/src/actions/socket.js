function createAction(type) {
  return (payload) => ({
    type,
    payload
  })
}

// controll
export const login = createAction('login');
export const logout = createAction('logout');

// we get when other users rrive
export const addUser = createAction('add user');
export const removeUser = createAction('remove user');

//
export const newMessage = createAction('new message');
export const sendMessage = createAction('send message');
