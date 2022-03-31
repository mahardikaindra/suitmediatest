import createReducer from '../../../utils/createReducer';
import * as types from '../types';

export const dataSession = createReducer(
  {},
  {
    [types.SET_USER_SESSION](state, action) {
      return {
        data: action.payload,
      };
    },
  }
);
