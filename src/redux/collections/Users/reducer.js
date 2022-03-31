import createReducer from '../../../utils/createReducer';
import * as types from '../types';

const initialState = {
  data: [],
  page: 0,
  total: 0,
  total_pages: 0,
}

export const dataUsers = createReducer(initialState, {
    [types.SET_DATA_USERS](state, action) {
      return {
        data: action.payload.data,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
        total: action.payload.total,
      };
    },
    [types.SET_DATA_MORE_USERS](state, action) {
      return {
        data: state.data.concat(action.payload.data),
        page: action.payload.page,
        total_pages: action.payload.total_pages,
        total: action.payload.total,
      };
    },
  }
);
