import * as ACTION_TYPES from "../actions/types";

// export const initialState = {
//   isAuthenticated: false,
//   profile: {
//     email: "",
//     firstName: "",
//     lastName: "",
//     isAdmin: false,
//     token: "",
//     expiresAt: ""
//   }
// };

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case ACTION_TYPES.LOGIN_FAIL:
      return {
        ...action.payload
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...action.payload
      };
    case ACTION_TYPES.ADD_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case ACTION_TYPES.UPDATE_PROFILE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };
    // case ACTION_TYPES.REMOVE_PROFILE:
    //   return {
    //     ...state,
    //     profile: { ...initialState.profile }
    //   };
    case ACTION_TYPES.IS_USER_ADMIN_SUCCESS:
      return {
        ...state,
        isAdmin: action.payload
      };
    default:
      return state;
  }
};
