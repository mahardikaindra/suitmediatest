import * as types from '../types';

const setDataUser = (data) => ({
  type: types.SET_DATA_USERS,
  payload: data,
});
const setDataMoreUser = (data) => ({
  type: types.SET_DATA_MORE_USERS,
  payload: data,
});


export function fetchingDataUser(page) {
  return (dispatch, getState) => {
    const dataUsers = getState()
    return new Promise((resolve, reject) => {
      return fetch(`https://reqres.in/api/users?page=${page}&amp;per_page=10`)
        .then((response) => response.json())
        .then((json) => {
          json.data.map((val) => Object.assign(val, {latitude: 51.73256540025445, longitude: -1.3358092771716716}))
          if (page > 1) {
            dispatch(setDataMoreUser(json))
            resolve(true)
          } else {
            dispatch(setDataUser(json))
            resolve(true)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function setDataUsers(user) {
  return dispatch => {
    return dispatch(setDataUser(user));
  };
}
export function setDataMoreUsers(user) {
  return dispatch => {
    return dispatch(setDataMoreUser(user));
  };
}


const setDataSelectedUser = (data) => ({
  type: types.SET_DATA_SELECTED_USERS,
  payload: data,
});

export function selectedUser(data) {
  return dispatch => {
    return dispatch(setDataSelectedUser(data));
  };
}
