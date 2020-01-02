import * as ACTION_TYPES from "../actions/types";

export const initialState = {
  users: []
};

export const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};
