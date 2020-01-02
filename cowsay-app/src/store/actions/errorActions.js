import * as ACTION_TYPES from "./types";

export const clearErrors = () => {
  return {
    type: ACTION_TYPES.CLEAR_ERRORS
  };
};

export const clearEmailErrors = () => {
  return {
    type: ACTION_TYPES.CLEAR_EMAIL_ERRORS
  };
};

export const clearPasswordErrors = () => {
  return {
    type: ACTION_TYPES.CLEAR_PASSWORD_ERRORS
  };
};
