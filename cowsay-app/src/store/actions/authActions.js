import * as ACTION_TYPES from "./types";

export const login_success = payload => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload
  };
};

export const login_fail = payload => {
  return {
    type: ACTION_TYPES.LOGIN_FAIL,
    payload
  };
};

export const logout = payload => {
  return {
    type: ACTION_TYPES.LOGOUT,
    payload
  };
};

export const add_profile = profile => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  };
};

export const update_profile = profile => {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE,
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
