import * as ACTION_TYPES from "../actions/types";

export const ErrorsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.EMAIL_VALIDATION_FAIL:
      return {
        ...state,
        emailErrors: [action.payload],
        passwordErrors: [...state.passwordErrors],
        cowsayMessage: ""
      };
    case ACTION_TYPES.EMAIL_VALIDATION_SUCCESS:
      return {
        ...state,
        emailErrors: [],
        passwordErrors: [...state.passwordErrors],
        cowsayMessage: "What an excellent email!"
      };
    case ACTION_TYPES.PASSWORD_VALIDATION_FAIL:
      return {
        ...state,
        emailErrors: [...state.emailErrors],
        passwordErrors: [action.payload],
        cowsayMessage: ""
      };
    case ACTION_TYPES.PASSWORD_VALIDATION_SUCCESS:
      return {
        ...state,
        emailErrors: [...state.emailErrors],
        passwordErrors: [],
        cowsayMessage: "Password passes smell test!"
      };
    case ACTION_TYPES.CLEAR_ERRORS:
      return {
        emailErrors: [],
        loginErrors: [],
        passwordErrors: []
      };
    case ACTION_TYPES.CLEAR_EMAIL_ERRORS:
      return {
        ...state,
        emailErrors: [],
        loginErrors: [],
        cowsayMessage: action.payload
      };
    // case ACTION_TYPES.CLEAR_LOGIN_ERRORS:
    //   return {
    //     ...state,
    //     loginErrors: [],
    //     cowsayMessage: ""
    //   };
    case ACTION_TYPES.CLEAR_PASSWORD_ERRORS:
      return {
        ...state,
        passwordErrors: [],
        loginErrors: []
      };
    case ACTION_TYPES.LOGIN_FAIL:
      return {
        ...state,
        loginErrors: [action.payload]
      };
    default:
      throw new Error();
  }
};
