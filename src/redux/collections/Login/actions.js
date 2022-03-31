import * as types from '../types';

const setUser = (data) => ({
  type: types.SET_USER_SESSION,
  payload: data,
});

export function setUserSession(user) {
  return dispatch => {
    return dispatch(setUser(user));
  };
}
