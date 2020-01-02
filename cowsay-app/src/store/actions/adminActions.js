import * as ACTION_TYPES from "./types";

// export const SUCCESS = {
//   type: ACTION_TYPES.SUCCESS
// };

// export const FAILURE = {
//   type: ACTION_TYPES.FAILURE
// };

export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  };
};

export const failure = message => {
  return {
    type: ACTION_TYPES.FAILURE,
    payload: message
  };
};

export const login_success = payload => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload
  };
};

export const add_profile = profile => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  };
};

export const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  };
};

export const signup_success = () => {
  return {
    type: ACTION_TYPES.SIGNUP_SUCCESS
  };
};

export const signup_failure = () => {
  return {
    type: ACTION_TYPES.SIGNUP_FAIL
  };
};

export const user_email_change = text => {
  return {
    type: ACTION_TYPES.USER_EMAIL_CHANGE,
    payload: text
  };
};

export const user_password_change = text => {
  return {
    type: ACTION_TYPES.USER_PASSWORD_CHANGE,
    payload: text
  };
};
export const user_input_submit = text => {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    payload: text
  };
};
